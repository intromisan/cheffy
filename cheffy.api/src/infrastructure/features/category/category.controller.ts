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
import { CategoryService } from './category.service';
import { CategoryDto } from 'src/domain/dtos/category/category.dto';
import { CreateUpdateCategoryDto } from 'src/domain/dtos/category/createUpdateCategory.dto';

@Controller('/api/v1/categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  findCategories(): Promise<CategoryDto[]> {
    return this.categoryService.findAllCategories();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createCategory(
    @Body() createUpdateCategoryDto: CreateUpdateCategoryDto,
  ): Promise<CategoryDto> {
    return this.categoryService.createCategory(createUpdateCategoryDto);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateCategory(
    @Param('id') id: string,
    @Body() createUpdateCategoryDto: CreateUpdateCategoryDto,
  ): Promise<CategoryDto> {
    return this.categoryService.updateCategory(id, createUpdateCategoryDto);
  }

  @Delete('/:id')
  deleteCategory(@Param('id') id: string): Promise<void> {
    return this.categoryService.deleteCategory(id);
  }
}
