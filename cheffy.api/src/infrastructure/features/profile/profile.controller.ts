import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from 'src/domain/dtos/profile/profile.dto';
import { CreateUpdateProfileDto } from 'src/domain/dtos/profile/createUpdateProfile.dto';

@Controller('/api/v1')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get('profiles')
  findAllProfiles(): Promise<ProfileDto[]> {
    return this.profileService.findAllProfiles();
  }

  @Get('profiles/:id')
  findProfileById(@Param('id') id: string): Promise<ProfileDto> {
    return this.profileService.findProfileById(id);
  }

  @Put('profiles/:id')
  @UsePipes(ValidationPipe)
  updateProfile(
    @Param('id') id: string,
    @Body() createUpdateProfileDto: CreateUpdateProfileDto,
  ): Promise<ProfileDto> {
    return this.profileService.updateProfile(id, createUpdateProfileDto);
  }

  @Delete('profiles/:id')
  deleteProfile(@Param('id') id: string): Promise<void> {
    return this.profileService.deleteProfile(id);
  }
}
