import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FridgeService } from './fridge.service';
import { FridgeDto } from 'src/domain/dtos/fridge/fridge.dto';
import { CreateUpdateFridgeDto } from 'src/domain/dtos/fridge/createUpdateFridge.dto';
import { RequestModel } from 'src/infrastructure/auth/middlewares/auth.middleware';
import { ProfileService } from '../profile/profile.service';

@Controller('/api/v1')
export class FridgeController {
  constructor(
    private readonly fridgeService: FridgeService,
    private readonly profileService: ProfileService,
  ) {}

  @Get('fridges/:id')
  findFridgeById(@Param('id') id: string): Promise<FridgeDto> {
    return this.fridgeService.getFridgeById(id);
  }

  @Post('fridges')
  @UsePipes(ValidationPipe)
  async createFridge(
    @Req() req: RequestModel,
    @Body() createUpdateFridgeDto: CreateUpdateFridgeDto,
  ): Promise<FridgeDto> {
    const { profile } = req;

    const fridge = await this.fridgeService.createFridge(createUpdateFridgeDto);
    this.profileService.addFridgeToProfile(profile.id, fridge);

    return fridge;
  }

  @Put('fridges/:id')
  @UsePipes(ValidationPipe)
  updateFridge(
    @Param('id') id: string,
    @Body() createUpdateFridgeDto: CreateUpdateFridgeDto,
  ): Promise<FridgeDto> {
    return this.fridgeService.updateFridge(id, createUpdateFridgeDto);
  }

  @Delete('fridges/:id')
  deleteFridge(@Param('id') id: string): Promise<void> {
    return this.fridgeService.deleteFridge(id);
  }
}
