import { Column, Entity, JoinTable, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity()
export class Macronutrients extends BaseEntity {
  @Column('number')
  calories: number;
  @Column('decimal', { precision: 6, scale: 4, nullable: true })
  carbonhydrates: number;
  @Column('decimal', { precision: 6, scale: 4, nullable: true })
  cholesterol: number;
  @Column('decimal', { precision: 6, scale: 4, nullable: true })
  fats: number;
  @Column('decimal', { precision: 6, scale: 4, nullable: true })
  fiber: number;
  @Column('decimal', { precision: 6, scale: 4, nullable: true })
  proteins: number;
}
