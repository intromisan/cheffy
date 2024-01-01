import { Macronutrients } from 'src/infrastructure/entities/macronutrients.entity';

export class GroceryDto {
  id: string;
  name: string;
  isOfficial: boolean;
  macronutrients: Macronutrients;
  createdAt: Date;
  updatedAt: Date;
}
