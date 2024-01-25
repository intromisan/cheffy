import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Profile } from '../entities/profile.entity';
import { CreateUserDto } from 'src/domain/dtos/user/createUser.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(
    createUserDto: CreateUserDto,
    profile: Profile,
  ): Promise<User> {
    const { id, email } = createUserDto;
    const userEntity = new User();

    userEntity.id = id;
    userEntity.email = email;
    userEntity.profile = profile;

    await userEntity.save();
    return userEntity;
  }
}
