import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecipeDto } from 'src/domain/dtos/recipe/createRecipe.dto';
import { RecipeDto } from 'src/domain/dtos/recipe/recipe.dto';
import { UpdateRecipeDto } from 'src/domain/dtos/recipe/updateRecipe.dto';
import { Recipe } from 'src/infrastructure/entities/recipe.entity';
import { RecipeRepository } from 'src/infrastructure/repositories/recipe.repository';
import { Step } from 'src/infrastructure/entities/step.entity';
import { StepDto } from 'src/domain/dtos/step/step.dto';
import { Profile } from 'src/infrastructure/entities/profile.entity';
import { ProfileRepository } from 'src/infrastructure/repositories/profile.repository';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeRepository)
    @InjectRepository(ProfileRepository)
    private readonly recipeRepository: RecipeRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  async getAllRecipes(): Promise<RecipeDto[]> {
    const recipeEntityList = await this.recipeRepository.find();

    const recipeDtoList = recipeEntityList.map((recipe) =>
      this.toRecipeDto(recipe),
    );

    return recipeDtoList;
  }

  async getRecipeById(id: string): Promise<RecipeDto> {
    const recipe = await this.recipeRepository.findRecipeById(id);

    return this.toRecipeDto(recipe);
  }

  async createRecipe(
    createRecipeDto: CreateRecipeDto,
    profileId: string,
  ): Promise<RecipeDto> {
    // Check if profile exists
    const profile = await this.profileRepository.findOne({
      where: { id: profileId },
    });
    if (!profile) {
      throw new NotFoundException(`Profile with id = ${profileId} not found`);
    }

    const recipeEntity = this.toRecipeEntity(createRecipeDto, profile);

    await this.recipeRepository.save(recipeEntity);

    return this.toRecipeDto(recipeEntity);
  }

  async updateRecipe(
    id: string,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<RecipeDto> {
    await this.recipeRepository.findRecipeById(id);

    await this.recipeRepository.update({ id }, { ...updateRecipeDto });

    return await this.getRecipeById(id);
  }

  async deleteRecipe(id: string): Promise<void> {
    const recipe = await this.recipeRepository.findRecipeById(id);

    await this.recipeRepository.remove(recipe);
  }

  private toRecipeEntity(
    createRecipeDto: CreateRecipeDto,
    profile: Profile,
  ): Recipe {
    const { name, description, imagePath } = createRecipeDto;
    const recipe = new Recipe();
    recipe.name = name;
    recipe.description = description;
    recipe.imagePath = imagePath;
    recipe.author = profile;

    return recipe;
  }

  private toRecipeDto(recipe: Recipe): RecipeDto {
    const { id, name, description, imagePath, steps } = recipe;

    const stepsDtoList = steps.map((step) => this.toStepItem(step));

    const recipeDto = new RecipeDto();
    recipeDto.id = id;
    recipeDto.name = name;
    recipeDto.description = description;
    recipeDto.imagePath = imagePath;
    recipeDto.steps = stepsDtoList;

    return recipeDto;
  }

  private toStepItem(step: Step): StepDto {
    const { id, description, number } = step;

    const stepDto = new StepDto();
    stepDto.id = id;
    stepDto.description = description;
    stepDto.number = number;

    return stepDto;
  }
}
