import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeDto, RecipeListItem } from 'src/domain/dtos/recipe/recipe.dto';
import { CreateRecipeDto } from 'src/domain/dtos/recipe/createRecipe.dto';
import { UpdateRecipeDto } from 'src/domain/dtos/recipe/updateRecipe.dto';
import { RequestModel } from 'src/infrastructure/auth/middlewares/auth.middleware';

@Controller('/api/v1')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get('recipes')
  findAllRecipes(): Promise<RecipeListItem[]> {
    return this.recipeService.getAllRecipes();
  }

  @Get('recipes/:id')
  findRecipeById(@Param('id') id: string): Promise<RecipeDto> {
    return this.recipeService.getRecipeById(id);
  }

  @Post('recipes')
  @UsePipes(ValidationPipe)
  createRecipe(
    @Req() request: RequestModel,
    @Body() createRecipeDto: CreateRecipeDto,
  ): Promise<RecipeDto> {
    const { profile } = request;
    return this.recipeService.createRecipe(createRecipeDto, profile.id);
  }

  @Put('recipes/:id')
  @UsePipes(ValidationPipe)
  updateRecipe(
    @Param('id') id: string,
    @Body() updateRecipeDto: UpdateRecipeDto,
  ): Promise<RecipeDto> {
    return this.recipeService.updateRecipe(id, updateRecipeDto);
  }

  @Delete('recipes/:id')
  deleteRecipe(@Param('id') id: string): Promise<void> {
    return this.recipeService.deleteRecipe(id);
  }
}
