import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('macronutrients')
export class Macronutrients extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer')
  calories: number;

  @Column('real')
  carbonhydrates: number;

  @Column('real')
  cholesterol: number;

  @Column('real')
  fats: number;

  @Column('real')
  fiber: number;

  @Column('real')
  proteins: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;
}
