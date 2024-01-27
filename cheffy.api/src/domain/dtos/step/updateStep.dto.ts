import { PartialType } from '@nestjs/mapped-types';
import { CreateStepDto } from './createStep.dto';

export class UpdateStepDto extends PartialType(CreateStepDto) {}
