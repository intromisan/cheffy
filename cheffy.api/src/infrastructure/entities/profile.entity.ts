import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Fridge } from './fridge.entity';
import { User } from './user.entity';

@Entity('profile')
export class Profile extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  profileName: string;

  @ManyToOne(() => Fridge, (fridge) => fridge.owners)
  fridge: Fridge;

  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn()
  user: User;
}
