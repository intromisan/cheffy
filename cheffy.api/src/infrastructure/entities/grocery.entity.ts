import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Macronutrients } from './macronutrients.entity';

@Entity()
export class Grocery extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('boolean', { default: false })
  isOfficial: boolean;

  @Column('uuid')
  macronutrientsId: string;

  @OneToOne(() => Macronutrients)
  @JoinTable()
  macronutrients: Macronutrients;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
