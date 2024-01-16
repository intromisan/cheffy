import { DataSource, Repository } from 'typeorm';
import { Profile } from '../entities/profile.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUpdateProfileDto } from 'src/domain/dtos/profile/createUpdateProfile.dto';

@Injectable()
export class ProfileRepository extends Repository<Profile> {
  constructor(private dataSource: DataSource) {
    super(Profile, dataSource.createEntityManager());
  }

  async findProfileById(id: string): Promise<Profile> {
    const profileEntity = await this.findOne({ where: { id } });

    if (!profileEntity) {
      throw new NotFoundException(`Profile with id = ${id} not found`);
    }

    return profileEntity;
  }

  async createProfile(
    createUpdateProfileDto: CreateUpdateProfileDto,
  ): Promise<Profile> {
    const profileEntity = this.toProfileEntity(createUpdateProfileDto);

    await profileEntity.save();

    return profileEntity;
  }

  async updateProfile(
    id: string,
    createUpdateProfileDto: CreateUpdateProfileDto,
  ): Promise<void> {
    await this.findProfileById(id);

    await this.update({ id }, { ...createUpdateProfileDto });
  }

  async deleteProfile(id: string): Promise<void> {
    const profile = await this.findProfileById(id);

    await this.remove(profile);
  }

  private toProfileEntity(
    createUpdateProfileDto: CreateUpdateProfileDto,
  ): Profile {
    const profile = new Profile();

    profile.profileName = createUpdateProfileDto.profileName;

    return profile;
  }
}
