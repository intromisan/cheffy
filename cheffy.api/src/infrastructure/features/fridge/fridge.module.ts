import { Module } from '@nestjs/common';
import { FridgeController } from './fridge.controller';
import { FridgeService } from './fridge.service';
import { FridgeRepository } from 'src/infrastructure/repositories/fridge.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([FridgeRepository])],
  controllers: [FridgeController],
  providers: [FridgeService, FridgeRepository],
})
export class FridgeModule {}
