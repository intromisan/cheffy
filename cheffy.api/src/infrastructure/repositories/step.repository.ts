import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Step } from '../entities/step.entity';

@Injectable()
export class StepRepository extends Repository<Step> {
  constructor(private dataSource: DataSource) {
    super(Step, dataSource.createEntityManager());
  }
}
