import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecipeDto } from 'src/domain/dtos/recipe/createRecipe.dto';
import { RecipeDto } from 'src/domain/dtos/recipe/recipe.dto';
import { UpdateRecipeDto } from 'src/domain/dtos/recipe/updateRecipe.dto';
import { Recipe } from 'src/infrastructure/entities/recipe.entity';
import { RecipeRepository } from 'src/infrastructure/repositories/recipe.repository';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeRepository)
    private readonly recipeRepository: RecipeRepository,
  ) {}

  async getAllRecipes(): Promise<RecipeDto[]> {
    const recipeEntityList = await this.recipeRepository.find();

    const recipeDtoList = recipeEntityList.map((recipe) =>
      this.toRecipeDto(recipe),
    );

    return recipeDtoList;
  }

  async getRecipeById(id: string): Promise<RecipeDto> {
    const recipe = await this.findRecipeById(id);

    return this.toRecipeDto(recipe);
  }

  async findRecipeById(id: string): Promise<Recipe> {
    const recipeEntity = await this.recipeRepository.findOne({ where: { id } });

    if (!recipeEntity) {
      throw new NotFoundException(`Recipe with id = ${id} not found`);
    }

    return recipeEntity;
  }

  async createRecipe(createRecipeDto: CreateRecipeDto): Promise<RecipeDto> {
    const recipeEntity = this.toRecipeEntity(createRecipeDto);

    await this.recipeRepository.save(recipeEntity);

    return this.toRecipeDto(recipeEntity);
  }

  async updateRecipe(
    id: string,
    updateRecipeDto: UpdateRecipeDto,
  ): Promise<RecipeDto> {
    await this.findRecipeById(id);

    await this.recipeRepository.update({ id }, { ...updateRecipeDto });

    return await this.getRecipeById(id);
  }

  async deleteRecipe(id: string): Promise<void> {
    const recipe = await this.findRecipeById(id);

    await this.recipeRepository.remove(recipe);
  }

  private toRecipeEntity(createRecipeDto: CreateRecipeDto): Recipe {
    const { name, description, imagePath } = createRecipeDto;
    const recipe = new Recipe();
    recipe.name = name;
    recipe.description = description;
    recipe.imagePath = imagePath;

    return recipe;
  }

  private toRecipeDto(recipe: Recipe): RecipeDto {
    const { id, name, description, imagePath } = recipe;

    const recipeDto = new RecipeDto();
    recipeDto.id = id;
    recipeDto.name = name;
    recipeDto.description = description;
    recipeDto.imagePath = imagePath;

    return recipeDto;
  }
}
