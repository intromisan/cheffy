import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;
}
