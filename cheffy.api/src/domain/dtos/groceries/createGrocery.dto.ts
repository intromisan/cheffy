import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateUpdateMacronutrientsDto } from '../macronutrients/createUpdateMacronutrients.dto';

export class CreateGroceryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  isOfficial: boolean;

  @IsOptional()
  macronutrientsId: string;

  @IsNotEmpty()
  macronutrients: CreateUpdateMacronutrientsDto;
}
