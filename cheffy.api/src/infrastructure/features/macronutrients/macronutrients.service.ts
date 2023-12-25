import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUpdateMacronutrientsDto } from 'src/domain/dtos/macronutrients/createUpdateMacronutrients.dto';
import { MacronutrientsDto } from 'src/domain/dtos/macronutrients/macronutrients.dto';
import { Macronutrients } from 'src/infrastructure/entities/macronutrients.entity';
import { MacronutrientsRepository } from 'src/infrastructure/repositories/macronutrients.repository';

@Injectable()
export class MacronutrientsService {
  constructor(
    @InjectRepository(MacronutrientsRepository)
    private macronutrientsRepository: MacronutrientsRepository,
  ) {}

  async findById(id: string): Promise<MacronutrientsDto> {
    const macronutrients =
      await this.macronutrientsRepository.findMacronutrientsById(id);
    return this.toMacronutrientsDto(macronutrients);
  }

  async createMacronutrients(
    createMacronutrientsDto: CreateUpdateMacronutrientsDto,
  ): Promise<MacronutrientsDto> {
    const macronutrients =
      await this.macronutrientsRepository.createMacronutrients(
        createMacronutrientsDto,
      );

    return this.toMacronutrientsDto(macronutrients);
  }

  async updateMacronutrients(
    id: string,
    createUpdateMacronutrientsDto: CreateUpdateMacronutrientsDto,
  ): Promise<MacronutrientsDto> {
    await this.macronutrientsRepository.updateMacronutrients(
      id,
      createUpdateMacronutrientsDto,
    );

    return await this.findById(id);
  }

  async deleteMacronutrients(id: string): Promise<void> {
    await this.macronutrientsRepository.deleteMacronutrients(id);
  }

  //Helpers

  private toMacronutrientsDto(
    macronutrientsEntity: Macronutrients,
  ): MacronutrientsDto {
    const macronutrients: MacronutrientsDto = new MacronutrientsDto();
    macronutrients.id = macronutrientsEntity.id;
    macronutrients.calories = macronutrientsEntity.calories;
    macronutrients.carbonhydrates = macronutrientsEntity.carbonhydrates;
    macronutrients.cholesterol = macronutrientsEntity.cholesterol;
    macronutrients.fats = macronutrientsEntity.fats;
    macronutrients.fiber = macronutrientsEntity.fiber;
    macronutrients.proteins = macronutrientsEntity.proteins;
    macronutrients.createdAt = macronutrientsEntity.createdAt;
    macronutrients.updatedAt = macronutrientsEntity.updatedAt;
    return macronutrients;
  }
}
