import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeRepository } from 'src/infrastructure/repositories/recipe.repository';
import { ProfileRepository } from 'src/infrastructure/repositories/profile.repository';
import { IngredientRepository } from 'src/infrastructure/repositories/ingredient.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RecipeRepository,
      ProfileRepository,
      IngredientRepository,
    ]),
  ],
  controllers: [RecipeController],
  providers: [
    RecipeService,
    RecipeRepository,
    ProfileRepository,
    IngredientRepository,
  ],
  exports: [RecipeService],
})
export class RecipeModule {}
