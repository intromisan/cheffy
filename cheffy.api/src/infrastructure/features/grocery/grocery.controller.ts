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
import { GroceryDto } from 'src/domain/dtos/groceries/grocery.dto';
import { CreateGroceryDto } from 'src/domain/dtos/groceries/createGrocery.dto';
import { GroceryFilterDto } from 'src/domain/dtos/groceries/groceryFilter.dto';
import { UpdateGroceryDto } from 'src/domain/dtos/groceries/updateGrocery.dto';

@Controller('groceries')
export class GroceryController {
  constructor(private groceryService: GroceryService) {}

  @Get()
  findGroceries(
    @Query(ValidationPipe) filterDto: GroceryFilterDto,
  ): Promise<GroceryDto[]> {
    return this.groceryService.findGroceries(filterDto);
  }

  @Get('/:id')
  findGroceryById(@Param('id') id: string): Promise<GroceryDto> {
    return this.groceryService.findGroceryById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createGrocery(
    @Body() createGroceryDto: CreateGroceryDto,
  ): Promise<GroceryDto> {
    return this.groceryService.createGrocery(createGroceryDto);
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateGrocery(
    @Param('id') id: string,
    @Body() updateGroceryDto: UpdateGroceryDto,
  ): Promise<GroceryDto> {
    return this.groceryService.updateGrocery(id, updateGroceryDto);
  }

  @Delete('/:id')
  deleteGrocery(@Param('id') id: string) {
    return this.groceryService.deleteGrocery(id);
  }
}
