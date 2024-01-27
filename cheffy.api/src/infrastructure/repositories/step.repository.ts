import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Step } from '../entities/step.entity';

@Injectable()
export class StepRepository extends Repository<Step> {
  constructor(private dataSource: DataSource) {
    super(Step, dataSource.createEntityManager());
  }

  async stepNumberExists(
    stepNumber: number,
    recipeId: string,
  ): Promise<boolean> {
    const count = await this.createQueryBuilder('step')
      .where('step.recipeId = :recipeId', { recipeId })
      .andWhere('step.number = :stepNumber', { stepNumber })
      .getCount();

    return count > 0;
  }
}
