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
import { ProfileDto } from 'src/domain/dtos/profiles/profile.dto';
import { CreateUpdateProfileDto } from 'src/domain/dtos/profiles/createUpdateProfile.dto';

@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  findAllProfiles(): Promise<ProfileDto[]> {
    return this.profileService.findAllProfiles();
  }

  @Get('/:id')
  findProfileById(@Param('id') id: string): Promise<ProfileDto> {
    return this.profileService.findProfileById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createProfile(
    @Body() createUpdateProfileDto: CreateUpdateProfileDto,
  ): Promise<ProfileDto> {
    return this.profileService.createProfile(createUpdateProfileDto);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateProfile(
    @Param('id') id: string,
    @Body() createUpdateProfileDto: CreateUpdateProfileDto,
  ): Promise<ProfileDto> {
    return this.profileService.updateProfile(id, createUpdateProfileDto);
  }

  @Delete('/:id')
  deleteProfile(@Param('id') id: string): Promise<void> {
    return this.profileService.deleteProfile(id);
  }
}
