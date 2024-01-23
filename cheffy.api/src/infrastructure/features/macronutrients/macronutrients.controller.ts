import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUpdateMacronutrientsDto } from 'src/domain/dtos/macronutrients/createUpdateMacronutrients.dto';
import { MacronutrientsService } from './macronutrients.service';
import { MacronutrientsDto } from 'src/domain/dtos/macronutrients/macronutrients.dto';

@Controller('/api/v1/macronutrients')
export class MacronutrientsController {
  constructor(private macronutrientsService: MacronutrientsService) {}

  @Get('/:id')
  findMacronutrientsById(@Param('id') id: string): Promise<MacronutrientsDto> {
    return this.macronutrientsService.findById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createMacronutrients(
    @Body() createMacronutrientsDto: CreateUpdateMacronutrientsDto,
  ): Promise<MacronutrientsDto> {
    return this.macronutrientsService.createMacronutrients(
      createMacronutrientsDto,
    );
  }

  @Put('/:id')
  @UsePipes(ValidationPipe)
  updateMacronutrients(
    @Param('id') id: string,
    @Body() createUpdateMacronutrientsDto: CreateUpdateMacronutrientsDto,
  ): Promise<MacronutrientsDto> {
    return this.macronutrientsService.updateMacronutrients(
      id,
      createUpdateMacronutrientsDto,
    );
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteMacronutrients(@Param('id') id: string): void {
    this.macronutrientsService.deleteMacronutrients(id);
  }
}
