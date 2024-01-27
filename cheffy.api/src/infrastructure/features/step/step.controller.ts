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
import { StepService } from './step.service';
import { StepDto } from 'src/domain/dtos/step/step.dto';
import { CreateStepDto } from 'src/domain/dtos/step/createStep.dto';
import { UpdateStepDto } from 'src/domain/dtos/step/updateStep.dto';

@Controller('/api/v1')
export class StepController {
  constructor(private readonly stepService: StepService) {}

  @Get('steps/:id')
  getStepById(@Param('id') id: string): Promise<StepDto> {
    return this.stepService.getStepById(id);
  }

  @Post('steps')
  @UsePipes(ValidationPipe)
  createStep(@Body() createStepDto: CreateStepDto): Promise<StepDto> {
    return this.stepService.createStep(createStepDto);
  }

  @Put('steps/:id')
  @UsePipes(ValidationPipe)
  async updateStep(
    @Param('id') id: string,
    @Body() updateStepDto: UpdateStepDto,
  ): Promise<StepDto> {
    await this.stepService.updateStep(id, updateStepDto);
    return this.stepService.getStepById(id);
  }

  @Delete('steps/:id')
  deleteStep(@Param('id') id: string): Promise<void> {
    return this.stepService.deleteStep(id);
  }
}
