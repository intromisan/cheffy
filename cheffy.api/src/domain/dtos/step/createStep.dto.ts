import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStepDto {
  @IsNotEmpty()
  @IsNumber()
  number: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  recipeId: string;
}
