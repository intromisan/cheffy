import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FridgeRepository } from 'src/infrastructure/repositories/fridge.repository';

@Injectable()
export class FridgeService {
  constructor(
    @InjectRepository(FridgeRepository)
    private fridgeRepository: FridgeRepository,
  ) {}

  async getFridgeById(id: string): Promise<FridgeDto>;
}
