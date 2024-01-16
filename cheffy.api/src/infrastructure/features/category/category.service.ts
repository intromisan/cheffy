import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryDto } from 'src/domain/dtos/category/category.dto';
import { CreateUpdateCategoryDto } from 'src/domain/dtos/category/createUpdateCategory.dto';
import { Category } from 'src/infrastructure/entities/category.entity';
import { CategoryRepository } from 'src/infrastructure/repositories/category.repository';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository,
  ) {}

  async findAllCategories(): Promise<CategoryDto[]> {
    const categoryEntityList =
      await this.categoryRepository.findAllCategories();

    const categoryDtoList = categoryEntityList.map((category) =>
      this.toCategoryDto(category),
    );

    return categoryDtoList;
  }

  async findCategoryById(id: string): Promise<CategoryDto> {
    const categoryEntity = await this.categoryRepository.findCategoryById(id);

    return this.toCategoryDto(categoryEntity);
  }

  async createCategory(
    createUpdateCategoryDto: CreateUpdateCategoryDto,
  ): Promise<CategoryDto> {
    const categoryEntity = await this.categoryRepository.createCategory(
      createUpdateCategoryDto,
    );

    return this.toCategoryDto(categoryEntity);
  }

  async updateCategory(
    id: string,
    createUpdateCategoryDto: CreateUpdateCategoryDto,
  ): Promise<CategoryDto> {
    await this.categoryRepository.updateCategory(id, createUpdateCategoryDto);

    return await this.findCategoryById(id);
  }

  async deleteCategory(id: string): Promise<void> {
    return await this.categoryRepository.deleteCategory(id);
  }

  private toCategoryDto(category: Category) {
    const categoryDto = new CategoryDto();

    categoryDto.id = category.id;
    categoryDto.name = category.name;

    return categoryDto;
  }
}
