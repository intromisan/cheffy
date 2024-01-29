import { PartialType } from '@nestjs/mapped-types';
import { IngredientListItem } from '../ingredient/ingredient.dto';
import { StepListItem } from '../step/step.dto';

export class RecipeDto {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  steps: StepListItem[];
  ingredients: IngredientListItem[];
}

export class RecipeListItem extends PartialType(RecipeDto) {}
