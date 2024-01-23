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
import { FridgeService } from './fridge.service';
import { FridgeDto } from 'src/domain/dtos/fridge/fridge.dto';
import { CreateUpdateFridgeDto } from 'src/domain/dtos/fridge/createUpdateFridge.dto';

@Controller('/api/v1')
export class FridgeController {
  constructor(private fridgeService: FridgeService) {}

  @Get('fridges/:id')
  fingFridgeById(@Param('id') id: string): Promise<FridgeDto> {
    return this.fridgeService.getFridgeById(id);
  }

  @Post('fridges')
  @UsePipes(ValidationPipe)
  createFridge(
    @Body() createUpdateFridgeDto: CreateUpdateFridgeDto,
  ): Promise<FridgeDto> {
    return this, this.fridgeService.createFridge(createUpdateFridgeDto);
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
