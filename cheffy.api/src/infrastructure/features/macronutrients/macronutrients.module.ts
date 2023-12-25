import { Module } from '@nestjs/common';
import { MacronutrientsController } from './macronutrients.controller';
import { MacronutrientsService } from './macronutrients.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MacronutrientsRepository } from 'src/infrastructure/repositories/macronutrients.repository';
import { Macronutrients } from 'src/infrastructure/entities/macronutrients.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MacronutrientsRepository])],
  controllers: [MacronutrientsController],
  providers: [MacronutrientsService, MacronutrientsRepository],
})
export class MacronutrientsModule {}
