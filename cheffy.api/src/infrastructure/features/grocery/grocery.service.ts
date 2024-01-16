import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGroceryDto } from 'src/domain/dtos/grocery/createGrocery.dto';
import { GroceryDto } from 'src/domain/dtos/grocery/grocery.dto';
import { GroceryFilterDto } from 'src/domain/dtos/grocery/groceryFilter.dto';
import { UpdateGroceryDto } from 'src/domain/dtos/grocery/updateGrocery.dto';
import { Grocery } from 'src/infrastructure/entities/grocery.entity';
import { GroceryRepository } from 'src/infrastructure/repositories/grocery.repository';
import { MacronutrientsRepository } from 'src/infrastructure/repositories/macronutrients.repository';

@Injectable()
export class GroceryService {
  constructor(
    @InjectRepository(GroceryRepository)
    @InjectRepository(MacronutrientsRepository)
    private groceryRepository: GroceryRepository,
    private macronutrientsRepository: MacronutrientsRepository,
  ) {}

  async findAllGroceries(): Promise<GroceryDto[]> {
    const groceryEntityList = await this.groceryRepository.findAllGroceries();

    const groceryDtoList = groceryEntityList.map((g) => this.toGroceryDto(g));

    return groceryDtoList;
  }

  async findGroceries(filterDto: GroceryFilterDto): Promise<GroceryDto[]> {
    const groceryList = await this.groceryRepository.findGroceries(filterDto);
    const groceryDtoList = groceryList.map((g) => this.toGroceryDto(g));
    return groceryDtoList;
  }

  async findGroceryById(id: string): Promise<GroceryDto> {
    const grocery = await this.groceryRepository.findGroceryById(id);

    return this.toGroceryDto(grocery);
  }

  async createGrocery(createGroceryDto: CreateGroceryDto): Promise<GroceryDto> {
    const macronutrientsEntity =
      await this.macronutrientsRepository.createMacronutrients(
        createGroceryDto.macronutrients,
      );

    createGroceryDto.macronutrientsId = macronutrientsEntity.id;

    const groceryEntity =
      await this.groceryRepository.createGrocery(createGroceryDto);

    return this.toGroceryDto(groceryEntity);
  }

  async updateGrocery(
    id: string,
    updateGrocery: UpdateGroceryDto,
  ): Promise<GroceryDto> {
    await this.groceryRepository.updateGrocery(id, updateGrocery);

    return await this.findGroceryById(id);
  }

  // TODO: fix cascade delete
  // Cascade delete works the other way around. When deleting grocery
  // macros stay in db. But when deleting macros, grocery delete as well.
  async deleteGrocery(id: string): Promise<void> {
    const grocery = await this.groceryRepository.findGroceryById(id);
    return await this.macronutrientsRepository.deleteMacronutrients(
      grocery.macronutrientsId,
    );
    // return await this.groceryRepository.deleteGrocery(id);
  }

  private toGroceryDto(grocery: Grocery): GroceryDto {
    const groceryDto = new GroceryDto();

    groceryDto.id = grocery.id;
    groceryDto.name = grocery.name;
    groceryDto.isOfficial = grocery.isOfficial;
    groceryDto.macronutrients = grocery.macronutrients;
    groceryDto.createdAt = grocery.createdAt;
    groceryDto.updatedAt = grocery.updatedAt;

    return groceryDto;
  }
}
