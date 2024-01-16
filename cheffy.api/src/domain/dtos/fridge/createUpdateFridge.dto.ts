import { IsString, ValidateIf } from 'class-validator';

export class CreateUpdateFridgeDto {
  @IsString()
  @ValidateIf((object, value) => value !== null)
  name!: string | null;
}
