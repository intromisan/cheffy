import { MeasurementUnit } from 'src/infrastructure/types/measurementUnit.enum';
import { GroceryDto, GroceryListItem } from '../grocery/grocery.dto';
import { OmitType, PartialType } from '@nestjs/mapped-types';

export class IngredientDto {
  id: string;
  quantity: number;
  measurementUnit: MeasurementUnit;
  recipeId: string;
  grocery: GroceryDto;
}

export class IngredientListItem extends PartialType(
  OmitType(IngredientDto, ['grocery']),
) {
  grocery: GroceryListItem;
}
