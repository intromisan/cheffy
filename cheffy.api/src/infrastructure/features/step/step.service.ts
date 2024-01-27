import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStepDto } from 'src/domain/dtos/step/createStep.dto';
import { StepDto } from 'src/domain/dtos/step/step.dto';
import { Step } from 'src/infrastructure/entities/step.entity';
import { StepRepository } from 'src/infrastructure/repositories/step.repository';
import { RecipeService } from '../recipe/recipe.service';
import { Recipe } from 'src/infrastructure/entities/recipe.entity';
import { UpdateStepDto } from 'src/domain/dtos/step/updateStep.dto';
import { RecipeRepository } from 'src/infrastructure/repositories/recipe.repository';

@Injectable()
export class StepService {
  constructor(
    @InjectRepository(StepRepository)
    @InjectRepository(RecipeRepository)
    private readonly stepRepository: StepRepository,
    private readonly recipeService: RecipeService,
  ) {}

  async getStepById(id: string): Promise<StepDto> {
    const step = await this.findStepById(id);

    return this.toStepDto(step);
  }

  async createStep(createStepDto: CreateStepDto): Promise<StepDto> {
    const recipe = await this.recipeService.findRecipeById(
      createStepDto.recipeId,
    );

    const numberIsUnique = await this.isStepNumberUnique(
      createStepDto.number,
      createStepDto.recipeId,
    );

    if (!numberIsUnique) {
      throw new BadRequestException(
        `Step with step number: ${createStepDto.number} already exsists`,
      );
    }

    const step = this.toStep(createStepDto, recipe);

    await this.stepRepository.save(step);

    return this.toStepDto(step);
  }

  async updateStep(id: string, updateStepDto: UpdateStepDto): Promise<void> {
    await this.findStepById(id);

    await this.stepRepository.update({ id }, { ...updateStepDto });
  }

  async deleteStep(id: string): Promise<void> {
    const step = await this.findStepById(id);

    await this.stepRepository.remove(step);
  }

  private async findStepById(id: string): Promise<Step> {
    const step = await this.stepRepository.findOne({
      where: { id },
      relations: { recipe: true },
    });

    if (!step) {
      throw new NotFoundException(`Step with id = ${id} not found`);
    }

    return step;
  }

  private async isStepNumberUnique(
    stepNumber: number,
    recipeId: string,
  ): Promise<boolean> {
    const count = await this.stepRepository
      .createQueryBuilder('step')
      .where('step.recipeId = :recipeId', { recipeId })
      .andWhere('step.number = :stepNumber', { stepNumber })
      .getCount();

    return count < 1;
  }

  private toStepDto(step: Step): StepDto {
    const { id, description, number, recipe } = step;
    const stepDto = new StepDto();

    stepDto.id = id;
    stepDto.number = number;
    stepDto.description = description;
    stepDto.recipeId = recipe.id;

    return stepDto;
  }

  private toStep(createStepDto: CreateStepDto, recipe: Recipe): Step {
    const { number, description } = createStepDto;
    const step = new Step();
    step.description = description;
    step.number = number;
    step.recipe = recipe;

    return step;
  }
}
