import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRecipeDto } from 'src/domain/dtos/recipe/createRecipe.dto';
import { RecipeDto, RecipeListItem } from 'src/domain/dtos/recipe/recipe.dto';
import { UpdateRecipeDto } from 'src/domain/dtos/recipe/updateRecipe.dto';
import { Recipe } from 'src/infrastructure/entities/recipe.entity';
import { RecipeRepository } from 'src/infrastructure/repositories/recipe.repository';
import { Step } from 'src/infrastructure/entities/step.entity';
import { StepDto } from 'src/domain/dtos/step/step.dto';
import { Profile } from 'src/infrastructure/entities/profile.entity';
import { ProfileRepository } from 'src/infrastructure/repositories/profile.repository';
import { Ingredient } from 'src/infrastructure/entities/ingredient.entity';
import { IngredientListItem } from 'src/domain/dtos/ingredient/ingredient.dto';
import { IngredientRepository } from 'src/infrastructure/repositories/ingredient.repository';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(RecipeRepository)
    @InjectRepository(ProfileRepository)
    @InjectRepository(IngredientRepository)
    private readonly recipeRepository: RecipeRepository,
    private readonly profileRepository: ProfileRepository,
    private readonly ingredientRepository: IngredientRepository,
  ) {}

  async getAllRecipes(): Promise<RecipeListItem[]> {
    const recipeEntityList = await this.recipeRepository.find();

    const recipeDtoList = recipeEntityList.map((recipe) =>
      this.toRecipeListItem(recipe),
    );

    return recipeDtoList;
  }

  async getRecipeById(id: string): Promise<RecipeDto> {
    const recipe = await this.recipeRepository.findRecipeById(id);

    const ingredients =
      await this.ingredientRepository.getAllIngredientsByRecipeId(id);

    return this.toRecipeDto(recipe, ingredients);
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
    const ingredients = [];

    await this.recipeRepository.save(recipeEntity);

    return this.toRecipeDto(recipeEntity, ingredients);
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

  private toRecipeDto(recipe: Recipe, ingredients: Ingredient[]): RecipeDto {
    const { id, name, description, imagePath, steps } = recipe;
    console.log(ingredients);

    const stepsDtoList = steps?.map((step) => this.toStepItem(step));
    const ingredientsDtoList = ingredients?.map((ingredient) =>
      this.toIngredientDto(ingredient),
    );

    const recipeDto = new RecipeDto();
    recipeDto.id = id;
    recipeDto.name = name;
    recipeDto.description = description;
    recipeDto.imagePath = imagePath;
    recipeDto.steps = stepsDtoList ?? [];
    recipeDto.ingredients = ingredientsDtoList ?? [];

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

  private toIngredientDto(ingredient: Ingredient): IngredientListItem {
    const { id: ingredientId, quantity, measurementUnit, grocery } = ingredient;

    const ingredientDto = new IngredientListItem();
    ingredientDto.id = ingredientId;
    ingredientDto.measurementUnit = measurementUnit;
    ingredientDto.quantity = quantity;
    ingredientDto.grocery = grocery;

    return ingredientDto;
  }

  private toRecipeListItem(recipe: Recipe): RecipeListItem {
    const { id, name, imagePath, author, description, categories } = recipe;
    const recipeItem = new RecipeListItem();

    recipeItem.id = id;
    recipeItem.description = description;
    recipeItem.imagePath = imagePath;
    recipeItem.name = name;

    return recipeItem;
  }
}
