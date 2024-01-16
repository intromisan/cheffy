import { Module } from '@nestjs/common';
import { FridgeController } from './fridge.controller';
import { FridgeService } from './fridge.service';
import { FridgeRepository } from 'src/infrastructure/repositories/fridge.repository';

@Module({
  imports: [FridgeRepository],
  controllers: [FridgeController],
  providers: [FridgeService, FridgeRepository],
})
export class FridgeModule {}
