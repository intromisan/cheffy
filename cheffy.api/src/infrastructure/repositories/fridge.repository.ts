import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Fridge } from '../entities/fridge.entity';

@Injectable()
export class FridgeRepository extends Repository<Fridge> {
  constructor(private dataSource: DataSource) {
    super(Fridge, dataSource.createEntityManager());
  }
}
