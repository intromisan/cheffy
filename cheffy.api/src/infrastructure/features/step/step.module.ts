import { Module } from '@nestjs/common';
import { StepController } from './step.controller';
import { StepService } from './step.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StepRepository } from 'src/infrastructure/repositories/step.repository';
import { RecipeRepository } from 'src/infrastructure/repositories/recipe.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StepRepository, RecipeRepository])],
  controllers: [StepController],
  providers: [StepService, StepRepository, RecipeRepository],
})
export class StepModule {}
