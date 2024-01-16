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

@Controller('fridges')
export class FridgeController {
  constructor(private fridgeService: FridgeService) {}

  @Get('/:id')
  fingFridgeById(@Param('id') id: string): Promise<FridgeDto> {
    return this.fridgeService.getFridgeById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createFridge(
    @Body() createUpdateFridgeDto: CreateUpdateFridgeDto,
  ): Promise<FridgeDto> {
    return this, this.fridgeService.createFridge(createUpdateFridgeDto);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateFridge(
    @Param('id') id: string,
    @Body() createUpdateFridgeDto: CreateUpdateFridgeDto,
  ): Promise<FridgeDto> {
    return this.fridgeService.updateFridge(id, createUpdateFridgeDto);
  }

  @Delete('/:id')
  deleteFridge(@Param('id') id: string): Promise<void> {
    return this.fridgeService.deleteFridge(id);
  }
}
