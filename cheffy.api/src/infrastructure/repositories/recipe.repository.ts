import { DataSource, Repository } from 'typeorm';
import { Recipe } from '../entities/recipe.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RecipeRepository extends Repository<Recipe> {
  constructor(private dataSource: DataSource) {
    super(Recipe, dataSource.createEntityManager());
  }
}
