import { Injectable, NotFoundException } from '@nestjs/common';
import { Macronutrients } from '../entities/macronutrients.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUpdateMacronutrientsDto } from 'src/domain/dtos/macronutrients/createUpdateMacronutrients.dto';

@Injectable()
export class MacronutrientsRepository extends Repository<Macronutrients> {
  constructor(private dataSource: DataSource) {
    super(Macronutrients, dataSource.createEntityManager());
  }

  async findMacronutrientsById(id: string): Promise<Macronutrients> {
    const macronutrientsEntity = await this.findOne({ where: { id } });

    if (!macronutrientsEntity) {
      throw new NotFoundException(`Macronutrients with id = ${id} not found`);
    }

    return macronutrientsEntity;
  }

  async createMacronutrients(
    createUpdateMacronutrientsDto: CreateUpdateMacronutrientsDto,
  ): Promise<Macronutrients> {
    const macronutrientsEntity = this.toMacronutrientsEntity(
      createUpdateMacronutrientsDto,
    );
    await macronutrientsEntity.save();
    return macronutrientsEntity;
  }

  async updateMacronutrients(
    id: string,
    createUpdateMacronutrientsDto: CreateUpdateMacronutrientsDto,
  ): Promise<void> {
    await this.findMacronutrientsById(id);

    await this.update({ id }, { ...createUpdateMacronutrientsDto });
  }

  async deleteMacronutrients(id: string): Promise<void> {
    const macronutrients = await this.findMacronutrientsById(id);

    await this.remove(macronutrients);
  }

  // Helpers

  private toMacronutrientsEntity(
    macronutrients: CreateUpdateMacronutrientsDto,
  ): Macronutrients {
    const macronutrientsEntity: Macronutrients = new Macronutrients();
    macronutrientsEntity.calories = macronutrients.calories;
    macronutrientsEntity.carbonhydrates = macronutrients.carbonhydrates;
    macronutrientsEntity.cholesterol = macronutrients.cholesterol;
    macronutrientsEntity.fats = macronutrients.fats;
    macronutrientsEntity.fiber = macronutrients.fiber;
    macronutrientsEntity.proteins = macronutrients.proteins;
    return macronutrientsEntity;
  }
}
