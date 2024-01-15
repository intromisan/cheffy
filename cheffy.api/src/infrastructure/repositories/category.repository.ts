import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateUpdateCategoryDto } from 'src/domain/dtos/categories/createUpdateCategory.dto';

@Injectable()
export class CategoryRepository extends Repository<Category> {
  constructor(private dataSource: DataSource) {
    super(Category, dataSource.createEntityManager());
  }

  async findAllCategories(): Promise<Category[]> {
    return await this.find();
  }

  async findCategoryById(id: string): Promise<Category> {
    const categoryEntity = await this.findOne({ where: { id } });

    if (!categoryEntity) {
      throw new NotFoundException(`Grocery with id = ${id} not found`);
    }

    return categoryEntity;
  }

  async createCategory(
    createUpdateCategoryDto: CreateUpdateCategoryDto,
  ): Promise<Category> {
    const categoryEntity = this.toCategory(createUpdateCategoryDto);

    await categoryEntity.save();
    return categoryEntity;
  }

  async updateCategory(
    id: string,
    updateCategory: CreateUpdateCategoryDto,
  ): Promise<void> {
    await this.findCategoryById(id);

    await this.update({ id }, { ...updateCategory });
  }

  async deleteCategory(id: string): Promise<void> {
    const category = await this.findCategoryById(id);

    await this.remove(category);
  }

  private toCategory(
    createUpdateCategoryDto: CreateUpdateCategoryDto,
  ): Category {
    const categoryEntity = new Category();

    categoryEntity.name = createUpdateCategoryDto.name;

    return categoryEntity;
  }
}
