import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GroceryService } from './grocery.service';
import { GroceryDto } from 'src/domain/dtos/grocery/grocery.dto';
import { CreateGroceryDto } from 'src/domain/dtos/grocery/createGrocery.dto';
import { GroceryFilterDto } from 'src/domain/dtos/grocery/groceryFilter.dto';
import { UpdateGroceryDto } from 'src/domain/dtos/grocery/updateGrocery.dto';

@Controller('/api/v1')
export class GroceryController {
  constructor(private groceryService: GroceryService) {}

  @Get('groceries')
  findGroceries(
    @Query(ValidationPipe) filterDto: GroceryFilterDto,
  ): Promise<GroceryDto[]> {
    return this.groceryService.findGroceries(filterDto);
  }

  @Get('groceries/:id')
  findGroceryById(@Param('id') id: string): Promise<GroceryDto> {
    return this.groceryService.findGroceryById(id);
  }

  @Post('groceries')
  @UsePipes(ValidationPipe)
  createGrocery(
    @Body() createGroceryDto: CreateGroceryDto,
  ): Promise<GroceryDto> {
    return this.groceryService.createGrocery(createGroceryDto);
  }

  @Put('groceries/:id')
  @UsePipes(ValidationPipe)
  updateGrocery(
    @Param('id') id: string,
    @Body() updateGroceryDto: UpdateGroceryDto,
  ): Promise<GroceryDto> {
    return this.groceryService.updateGrocery(id, updateGroceryDto);
  }

  @Delete('groceries/:id')
  deleteGrocery(@Param('id') id: string) {
    return this.groceryService.deleteGrocery(id);
  }
}
