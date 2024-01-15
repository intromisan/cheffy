import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUpdateProfileDto } from 'src/domain/dtos/profiles/createUpdateProfile.dto';
import { ProfileDto } from 'src/domain/dtos/profiles/profile.dto';
import { Profile } from 'src/infrastructure/entities/profile.entity';
import { ProfileRepository } from 'src/infrastructure/repositories/profile.repository';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
  ) {}

  async findAllProfiles(): Promise<ProfileDto[]> {
    const profileEntityList = await this.profileRepository.find();

    const profileDtoList = profileEntityList.map((pe) => this.toProfileDto(pe));

    return profileDtoList;
  }

  async findProfileById(id: string): Promise<ProfileDto> {
    const profile = await this.profileRepository.findProfileById(id);

    return this.toProfileDto(profile);
  }

  async createProfile(
    createUpdateProfileDto: CreateUpdateProfileDto,
  ): Promise<ProfileDto> {
    const profile = await this.profileRepository.createProfile(
      createUpdateProfileDto,
    );

    return this.toProfileDto(profile);
  }

  async updateProfile(
    id: string,
    createUpdateProfileDto: CreateUpdateProfileDto,
  ): Promise<ProfileDto> {
    await this.profileRepository.updateProfile(id, createUpdateProfileDto);
    const profile = await this.profileRepository.findProfileById(id);

    return this.toProfileDto(profile);
  }

  async deleteProfile(id: string): Promise<void> {
    await this.profileRepository.deleteProfile(id);
  }

  private toProfileDto(profile: Profile): ProfileDto {
    const profileDto = new ProfileDto();

    profileDto.id = profile.id;
    profileDto.profileName = profile.profileName;

    return profileDto;
  }
}