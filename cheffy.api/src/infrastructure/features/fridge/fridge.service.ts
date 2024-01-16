import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUpdateFridgeDto } from 'src/domain/dtos/fridge/createUpdateFridge.dto';
import { FridgeDto } from 'src/domain/dtos/fridge/fridge.dto';
import { FridgeOwner } from 'src/domain/dtos/fridge/fridgeOwner.dto';
import { Fridge } from 'src/infrastructure/entities/fridge.entity';
import { FridgeRepository } from 'src/infrastructure/repositories/fridge.repository';

@Injectable()
export class FridgeService {
  constructor(
    @InjectRepository(FridgeRepository)
    private fridgeRepository: FridgeRepository,
  ) {}

  async getFridgeById(id: string): Promise<FridgeDto> {
    const fridgeEntity = await this.findFridgeById(id);

    return this.toFridgeDto(fridgeEntity);
  }

  async createFridge(
    createUpdateFridgeDto: CreateUpdateFridgeDto,
  ): Promise<FridgeDto> {
    const fridgeEntity = this.toFridgeEntity(createUpdateFridgeDto);

    await fridgeEntity.save();

    return this.toFridgeDto(fridgeEntity);
  }

  async updateFridge(
    id: string,
    createUpdateFridgeDto: CreateUpdateFridgeDto,
  ): Promise<FridgeDto> {
    await this.findFridgeById(id);
    await this.fridgeRepository.update({ id }, { ...createUpdateFridgeDto });

    return this.getFridgeById(id);
  }

  async deleteFridge(id: string): Promise<void> {
    const fridgeEntity = await this.findFridgeById(id);

    await this.fridgeRepository.remove(fridgeEntity);
  }

  private async findFridgeById(id: string): Promise<Fridge> {
    const fridgeEntity = await this.fridgeRepository.findOne({
      relations: { owners: true },
      where: { id },
    });

    if (!fridgeEntity) {
      throw new NotFoundException(`Fridge with id = ${id} not found`);
    }

    return fridgeEntity;
  }

  private toFridgeEntity(createUpdateFridgeDto: CreateUpdateFridgeDto): Fridge {
    const fridge = new Fridge();

    fridge.name = createUpdateFridgeDto.name;
    fridge.owners = [];

    return fridge;
  }

  private toFridgeDto(fridge: Fridge): FridgeDto {
    const fridgeDto = new FridgeDto();
    let fridgeOwners: FridgeOwner[] = [];
    for (let i = 0; i > fridge.owners.length; i++) {
      const owner = new FridgeOwner();
      owner.id = fridge.owners[i].id;
      owner.profileName = fridge.owners[i].profileName;
      fridgeOwners.push(owner);
    }

    fridgeDto.id = fridge.id;
    fridgeDto.name = fridge.name;
    fridgeDto.owners = fridgeOwners;

    return fridgeDto;
  }
}
