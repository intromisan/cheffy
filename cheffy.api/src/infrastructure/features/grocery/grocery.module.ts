import { Module } from '@nestjs/common';
import { GroceryController } from './grocery.controller';
import { GroceryService } from './grocery.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroceryRepository } from 'src/infrastructure/repositories/grocery.repository';
import { MacronutrientsRepository } from 'src/infrastructure/repositories/macronutrients.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([GroceryRepository, MacronutrientsRepository]),
  ],
  controllers: [GroceryController],
  providers: [GroceryService, GroceryRepository, MacronutrientsRepository],
})
export class GroceryModule {}
