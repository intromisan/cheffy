import { Module } from '@nestjs/common';
import { StepController } from './step.controller';
import { StepService } from './step.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StepRepository } from 'src/infrastructure/repositories/step.repository';
import { RecipeModule } from '../recipe/recipe.module';

@Module({
  imports: [TypeOrmModule.forFeature([StepRepository]), RecipeModule],
  controllers: [StepController],
  providers: [StepService, StepRepository],
})
export class StepModule {}
