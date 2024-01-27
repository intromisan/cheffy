import { StepListItem } from '../step/step.dto';

export class RecipeDto {
  id: string;
  name: string;
  description: string;
  imagePath: string;
  steps: StepListItem[];
}
