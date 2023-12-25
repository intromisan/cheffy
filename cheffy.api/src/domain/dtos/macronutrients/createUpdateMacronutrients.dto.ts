import { IsNumber } from 'class-validator';

export class CreateUpdateMacronutrientsDto {
  @IsNumber()
  calories: number;
  @IsNumber()
  carbonhydrates: number;
  @IsNumber()
  cholesterol: number;
  @IsNumber()
  fats: number;
  @IsNumber()
  fiber: number;
  @IsNumber()
  proteins: number;
}
