import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Ingredient } from '../entities/ingredient.entity';

@Injectable()
export class IngredientRepository extends Repository<Ingredient> {
  constructor(private dataSource: DataSource) {
    super(Ingredient, dataSource.createEntityManager());
  }

  async groceryExists(groceryId: string, recipeId: string): Promise<boolean> {
    const count = await this.createQueryBuilder('ingredient')
      .where('ingredient.recipeId = :recipeId', { recipeId })
      .andWhere('ingredient.groceryId = :groceryId', { groceryId })
      .getCount();

    return count > 0;
  }

  async getAllIngredientsByRecipeId(recipeId: string): Promise<Ingredient[]> {
    const ingredients = await this.createQueryBuilder('ingredient')
      .leftJoinAndSelect('ingredient.grocery', 'grocery')
      .where('ingredient.recipeId = :recipeId', { recipeId })
      .getMany();

    return ingredients;
  }
}
