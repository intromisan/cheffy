import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity('fridge')
export class Fridge extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: 255, nullable: true })
  name: string;

  @OneToMany(() => Profile, (profile) => profile.fridge)
  owners: Profile[];
}
