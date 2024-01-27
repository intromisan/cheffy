import { PartialType } from '@nestjs/mapped-types';

export class StepDto {
  id: string;
  number: number;
  description: string;
  recipeId: string;
}

export class StepListItem extends PartialType(StepDto) {}
