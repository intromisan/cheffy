import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateGroceryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsBoolean()
  isOfficial: boolean;
}
