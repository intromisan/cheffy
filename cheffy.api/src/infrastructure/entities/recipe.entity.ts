import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';
import { Step } from './step.entity';
import { Ingredient } from './ingredient.entity';
import { Category } from './category.entity';

@Entity('recipe')
export class Recipe extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  name: string;

  @Column('varchar')
  description: string;

  @Column('varchar', { nullable: true })
  imagePath: string;

  @ManyToOne(() => Profile)
  author: Profile;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @OneToMany(() => Ingredient, (ingredient) => ingredient.recipe)
  ingredients: Ingredient[];

  @OneToMany(() => Step, (step) => step.recipe)
  steps: Step[];
}
