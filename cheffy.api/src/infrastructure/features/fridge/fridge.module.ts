import { Module } from '@nestjs/common';
import { FridgeController } from './fridge.controller';
import { FridgeService } from './fridge.service';
import { FridgeRepository } from 'src/infrastructure/repositories/fridge.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileService } from '../profile/profile.service';
import { ProfileModule } from '../profile/profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([FridgeRepository]), ProfileModule],
  controllers: [FridgeController],
  providers: [FridgeService, FridgeRepository],
})
export class FridgeModule {}
