import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recipe } from './recipe.entity';

@Entity('step')
export class Step extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('integer')
  number: number;

  @Column('varchar')
  description: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.steps)
  recipe: Recipe;
}
