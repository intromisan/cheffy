import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { ProfileRepository } from '../repositories/profile.repository';
import { CreateUserDto } from 'src/domain/dtos/user/createUser.dto';
import { CreateUpdateProfileDto } from 'src/domain/dtos/profile/createUpdateProfile.dto';
import { UserDto } from 'src/domain/dtos/user/user.dto';
import { User } from '../entities/user.entity';
import { ProfileDto } from 'src/domain/dtos/profile/profile.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    @InjectRepository(ProfileRepository)
    private readonly userRepository: UserRepository,
    private readonly profileRepository: ProfileRepository,
  ) {}

  async findUserById(id: string): Promise<UserDto> {
    const userEntity = await this.userRepository.findOne({
      where: { id },
      relations: { profile: true },
    });

    if (!userEntity) {
      throw new NotFoundException(`User with id = ${id} not found`);
    }

    return this.toUserDto(userEntity);
  }

  async signIn(userId: string): Promise<ProfileDto> {
    const profileEntity = await this.profileRepository.findOne({
      where: { id: userId },
    });

    if (!profileEntity) {
      throw new InternalServerErrorException(
        `No profile for user: ${userId} was found`,
      );
    }

    const profileDto = new ProfileDto();
    profileDto.id = profileEntity.id;
    profileDto.profileName = profileEntity.profileName;

    return profileDto;
  }

  async signUp(
    createUserDto: CreateUserDto,
    createUpdateProfileDto: CreateUpdateProfileDto,
  ): Promise<UserDto> {
    const userEntity = await this.userRepository.createUser(createUserDto);

    await this.profileRepository.createProfile(
      createUpdateProfileDto,
      userEntity,
    );

    return this.toUserDto(userEntity);
  }

  private toUserDto(user: User) {
    // Create profile dto
    const { id: profileId, profileName } = user.profile;
    const profileDto = new ProfileDto();
    profileDto.id = profileId;
    profileDto.profileName = profileName;

    // Create user dto
    const userDto = new UserDto();
    userDto.id = user.id;
    userDto.email = user.email;
    userDto.profile = profileDto;

    return userDto;
  }
}
