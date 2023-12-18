import { Column, Entity, JoinTable, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';
import { Macronutrients } from './macronutrients.entity';

@Entity()
export class Grocery extends BaseEntity {
  @Column('varchar', { length: 255 })
  name: string;

  @Column('boolean', { default: false })
  isOfficial: boolean;

  @Column('uuid')
  macronutrientsId: string;

  @OneToOne(() => Macronutrients)
  @JoinTable()
  macronutrients: Macronutrients;
}
