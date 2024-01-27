import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { IngredientDto } from 'src/domain/dtos/ingredient/ingredient.dto';
import { CreateIngredientDto } from 'src/domain/dtos/ingredient/createIngredient.dto';
import { UpdateIngredientDto } from 'src/domain/dtos/ingredient/updateIngredient.dto';

@Controller('/api/v1')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) {}

  @Get('ingredients/:id')
  getIngredientById(@Param('id') id: string): Promise<IngredientDto> {
    return this.ingredientService.getIngredientById(id);
  }

  @Post('ingredients')
  @UsePipes(ValidationPipe)
  createIngredient(
    @Body() createIngredientDto: CreateIngredientDto,
  ): Promise<IngredientDto> {
    return this.ingredientService.createIngredient(createIngredientDto);
  }

  @Put('ingredients/:id')
  @UsePipes(ValidationPipe)
  async updateIngredient(
    @Param('id') id: string,
    @Body() updateIngredientDto: UpdateIngredientDto,
  ): Promise<IngredientDto> {
    await this.ingredientService.updateIngredient(id, updateIngredientDto);
    return this.getIngredientById(id);
  }

  @Delete('ingredients/:id')
  deleteIngredient(@Param('id') id: string): Promise<void> {
    return this.ingredientService.deleteIngredient(id);
  }
}
