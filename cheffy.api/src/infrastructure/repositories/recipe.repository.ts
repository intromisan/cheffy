import { DataSource, Repository } from 'typeorm';
import { Recipe } from '../entities/recipe.entity';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class RecipeRepository extends Repository<Recipe> {
  constructor(private dataSource: DataSource) {
    super(Recipe, dataSource.createEntityManager());
  }

  async findRecipeById(id: string): Promise<Recipe> {
    const recipeEntity = await this.findOne({
      where: { id },
      relations: { steps: true },
    });

    if (!recipeEntity) {
      throw new NotFoundException(`Recipe with id = ${id} not found`);
    }

    return recipeEntity;
  }
}
