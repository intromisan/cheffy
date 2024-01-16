import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Grocery } from '../entities/grocery.entity';
import { CreateGroceryDto } from 'src/domain/dtos/grocery/createGrocery.dto';
import { GroceryFilterDto } from 'src/domain/dtos/grocery/groceryFilter.dto';
import { UpdateGroceryDto } from 'src/domain/dtos/grocery/updateGrocery.dto';

@Injectable()
export class GroceryRepository extends Repository<Grocery> {
  constructor(private dataSource: DataSource) {
    super(Grocery, dataSource.createEntityManager());
  }

  async findAllGroceries(): Promise<Grocery[]> {
    return await this.find({ relations: { macronutrients: true } });
  }

  async findGroceries(filterDto: GroceryFilterDto): Promise<Grocery[]> {
    const { isOfficial, name } = filterDto;

    const query = this.createQueryBuilder('grocery').leftJoinAndSelect(
      'grocery.macronutrients',
      'macronutrients',
    );

    if (isOfficial) {
      query.andWhere('grocery.isOfficial = :isOfficial', { isOfficial });
    }

    if (name) {
      query.andWhere('grocery.name LIKE :name', { name: `%${name}%` });
    }

    const groceries = await query.getMany();

    return groceries;
  }

  async findGroceryById(id: string): Promise<Grocery> {
    const groceryEntity = await this.findOne({ where: { id } });

    if (!groceryEntity) {
      throw new NotFoundException(`Grocery with id = ${id} not found`);
    }

    return groceryEntity;
  }

  async createGrocery(createGroceryDto: CreateGroceryDto): Promise<Grocery> {
    const groceryEntity = this.toGroceryEntity(createGroceryDto);

    await groceryEntity.save();

    return groceryEntity;
  }

  async updateGrocery(
    id: string,
    updateGrocery: UpdateGroceryDto,
  ): Promise<void> {
    await this.findGroceryById(id);

    await this.update({ id }, { ...updateGrocery });
  }

  async deleteGrocery(id: string): Promise<void> {
    const grocery = await this.findGroceryById(id);

    await this.remove(grocery);
  }

  private toGroceryEntity(createGroceryDto: CreateGroceryDto): Grocery {
    const groceryEntity = new Grocery();

    groceryEntity.name = createGroceryDto.name;
    groceryEntity.isOfficial = createGroceryDto.isOfficial;
    groceryEntity.macronutrientsId = createGroceryDto.macronutrientsId;

    return groceryEntity;
  }
}
