import {
  BaseEntity,
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

  @OneToOne(() => Profile)
  @JoinColumn()
  profile: Profile;
}
