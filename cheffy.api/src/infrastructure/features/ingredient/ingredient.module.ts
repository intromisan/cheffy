import { Module } from '@nestjs/common';
import { IngredientController } from './ingredient.controller';
import { IngredientService } from './ingredient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientRepository } from 'src/infrastructure/repositories/ingredient.repository';
import { RecipeRepository } from 'src/infrastructure/repositories/recipe.repository';
import { GroceryRepository } from 'src/infrastructure/repositories/grocery.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IngredientRepository,
      RecipeRepository,
      GroceryRepository,
    ]),
  ],
  controllers: [IngredientController],
  providers: [
    IngredientService,
    IngredientRepository,
    RecipeRepository,
    GroceryRepository,
  ],
})
export class IngredientModule {}
