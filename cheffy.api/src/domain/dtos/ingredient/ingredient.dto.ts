import { MeasurementUnit } from 'src/infrastructure/types/measurementUnit.enum';
import { GroceryDto } from '../grocery/grocery.dto';

export class IngredientDto {
  id: string;
  quantity: number;
  measurementUnit: MeasurementUnit;
  recipeId: string;
  grocery: GroceryDto;
}
