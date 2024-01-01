import { IsBooleanString, IsOptional, IsString } from 'class-validator';

export class GroceryFilterDto {
  @IsOptional()
  @IsBooleanString()
  isOfficial: boolean;

  @IsOptional()
  @IsString()
  name: string;
}
