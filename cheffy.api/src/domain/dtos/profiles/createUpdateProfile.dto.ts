import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUpdateProfileDto {
  @IsNotEmpty()
  @IsString()
  profileName: string;
}
