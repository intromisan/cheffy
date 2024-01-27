import { IsEnum, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';
import { MeasurementUnit } from 'src/infrastructure/types/measurementUnit.enum';

export class CreateIngredientDto {
  @IsNotEmpty()
  @IsUUID()
  recipeId: string;

  @IsNotEmpty()
  @IsUUID()
  groceryId: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsEnum(MeasurementUnit)
  measurementUnit: MeasurementUnit;
}
