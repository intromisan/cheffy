import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recipe } from './recipe.entity';
import { Grocery } from './grocery.entity';
import { MeasurementUnit } from '../types/measurementUnit.enum';

@Entity('ingredient')
export class Ingredient extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients)
  recipe: Recipe;

  @ManyToOne(() => Grocery)
  grocery: Grocery;

  @Column('real')
  quantity: number;

  @Column('varchar')
  measurementUnit: MeasurementUnit;
}
