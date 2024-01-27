import { Module } from '@nestjs/common';
import { RecipeController } from './recipe.controller';
import { RecipeService } from './recipe.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeRepository } from 'src/infrastructure/repositories/recipe.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RecipeRepository])],
  controllers: [RecipeController],
  providers: [RecipeService, RecipeRepository],
})
export class RecipeModule {}
