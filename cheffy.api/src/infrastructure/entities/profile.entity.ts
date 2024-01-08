import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Fridge } from './fridge.entity';

@Entity('profile')
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  profileName: string;

  @ManyToOne(() => Fridge, (fridge) => fridge.owners)
  fridge: Fridge;
}
