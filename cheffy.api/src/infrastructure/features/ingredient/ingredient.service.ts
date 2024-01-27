import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateIngredientDto } from 'src/domain/dtos/ingredient/createIngredient.dto';
import { IngredientDto } from 'src/domain/dtos/ingredient/ingredient.dto';
import { UpdateIngredientDto } from 'src/domain/dtos/ingredient/updateIngredient.dto';
import { Grocery } from 'src/infrastructure/entities/grocery.entity';
import { Ingredient } from 'src/infrastructure/entities/ingredient.entity';
import { Recipe } from 'src/infrastructure/entities/recipe.entity';
import { GroceryRepository } from 'src/infrastructure/repositories/grocery.repository';
import { IngredientRepository } from 'src/infrastructure/repositories/ingredient.repository';
import { RecipeRepository } from 'src/infrastructure/repositories/recipe.repository';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(IngredientRepository)
    @InjectRepository(RecipeRepository)
    @InjectRepository(GroceryRepository)
    private readonly ingredientRepository: IngredientRepository,
    private readonly recipeRepository: RecipeRepository,
    private readonly groceryRepository: GroceryRepository,
  ) {}

  async getIngredientById(id: string): Promise<IngredientDto> {
    const ingredient = await this.findIngredientById(id);

    return this.toIngredientDto(ingredient);
  }

  async createIngredient(
    createIngredientDto: CreateIngredientDto,
  ): Promise<IngredientDto> {
    const { groceryId, recipeId } = createIngredientDto;

    // Check recipe exists
    const recipe = await this.recipeRepository.findRecipeById(recipeId);
    if (!recipe) {
      throw new NotFoundException(`Recipe with id = ${recipeId} not found`);
    }

    // Check grocery exists
    const grocery = await this.groceryRepository.findGroceryById(groceryId);
    if (!grocery) {
      throw new NotFoundException(`Grocery with id = ${groceryId} not found`);
    }

    // Check there is no same grocery
    const groceryExists = await this.ingredientRepository.groceryExists(
      groceryId,
      recipeId,
    );

    if (groceryExists) {
      throw new BadRequestException(
        `There is alread a grocery with id = ${groceryId}`,
      );
    }

    // Create Ingredient
    const ingredient = this.toIngredient(createIngredientDto, recipe, grocery);
    await this.ingredientRepository.save(ingredient);

    return this.toIngredientDto(ingredient);
  }

  async updateIngredient(
    id: string,
    updateIngredientDto: UpdateIngredientDto,
  ): Promise<IngredientDto> {
    await this.findIngredientById(id);

    await this.ingredientRepository.update({ id }, { ...updateIngredientDto });

    return await this.getIngredientById(id);
  }

  async deleteIngredient(id: string): Promise<void> {
    const ingredient = await this.findIngredientById(id);
    await this.ingredientRepository.remove(ingredient);
  }

  private async findIngredientById(id: string): Promise<Ingredient> {
    const ingredient = this.ingredientRepository.findOne({
      where: { id },
      relations: { grocery: true, recipe: true },
    });

    if (!ingredient) {
      throw new NotFoundException(`Ingredient with id = ${id} not found`);
    }

    return ingredient;
  }

  private toIngredientDto(ingredient: Ingredient): IngredientDto {
    const { id, quantity, measurementUnit, recipe, grocery } = ingredient;

    const ingredientDto = new IngredientDto();

    ingredientDto.id = id;
    ingredientDto.quantity = quantity;
    ingredientDto.measurementUnit = measurementUnit;
    ingredientDto.recipeId = recipe.id;
    ingredientDto.grocery = grocery;

    return ingredientDto;
  }

  private toIngredient(
    createIngredientDto: CreateIngredientDto,
    recipe: Recipe,
    grocery: Grocery,
  ): Ingredient {
    const { measurementUnit, quantity } = createIngredientDto;

    const ingredient = new Ingredient();
    ingredient.quantity = quantity;
    ingredient.measurementUnit = measurementUnit;
    ingredient.recipe = recipe;
    ingredient.grocery = grocery;

    return ingredient;
  }
}
