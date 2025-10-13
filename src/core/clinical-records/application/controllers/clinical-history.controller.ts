import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClinicalHistoryService } from '../services/clinical-history.service';
import { CreateClinicalHistoryDto, UpdateClinicalHistoryDto } from '../dtos/clinical-history.dto';
import { ClinicalHistory } from '../../domain/entities/clinical-history.entity';

@ApiTags('clinical-history')
@Controller('clinical-history')
export class ClinicalHistoryController {
  constructor(
    private readonly clinicalHistoryService: ClinicalHistoryService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all clinical histories' })
  @ApiResponse({ status: 200, description: 'Returns all clinical histories', type: [ClinicalHistory] })
  async findAll(): Promise<ClinicalHistory[]> {
    return this.clinicalHistoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a clinical history by ID' })
  @ApiResponse({ status: 200, description: 'Returns the clinical history', type: ClinicalHistory })
  @ApiResponse({ status: 404, description: 'Clinical history not found' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<ClinicalHistory> {
    return this.clinicalHistoryService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new clinical history' })
  @ApiResponse({ status: 201, description: 'Returns the created clinical history', type: ClinicalHistory })
  async create(@Body() createHistoryDto: CreateClinicalHistoryDto): Promise<ClinicalHistory> {
    return this.clinicalHistoryService.create(createHistoryDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a clinical history' })
  @ApiResponse({ status: 200, description: 'Returns the updated clinical history', type: ClinicalHistory })
  @ApiResponse({ status: 404, description: 'Clinical history not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateHistoryDto: UpdateClinicalHistoryDto
  ): Promise<ClinicalHistory> {
    return this.clinicalHistoryService.update(id, updateHistoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a clinical history' })
  @ApiResponse({ status: 200, description: 'Clinical history successfully deleted' })
  @ApiResponse({ status: 404, description: 'Clinical history not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.clinicalHistoryService.delete(id);
  }

  @Post(':id/conditions/:conditionId')
  @ApiOperation({ summary: 'Add a clinical condition to a history' })
  @ApiResponse({ status: 200, description: 'Condition added successfully' })
  @ApiResponse({ status: 404, description: 'Clinical history or condition not found' })
  async addCondition(
    @Param('id', ParseIntPipe) id: number,
    @Param('conditionId', ParseIntPipe) conditionId: number
  ): Promise<void> {
    return this.clinicalHistoryService.addCondition(id, conditionId);
  }

  @Delete(':id/conditions/:conditionId')
  @ApiOperation({ summary: 'Remove a clinical condition from a history' })
  @ApiResponse({ status: 200, description: 'Condition removed successfully' })
  @ApiResponse({ status: 404, description: 'Clinical history or condition not found' })
  async removeCondition(
    @Param('id', ParseIntPipe) id: number,
    @Param('conditionId', ParseIntPipe) conditionId: number
  ): Promise<void> {
    return this.clinicalHistoryService.removeCondition(id, conditionId);
  }

  @Post(':id/vaccines/:vaccineId')
  @ApiOperation({ summary: 'Add a vaccine to a history' })
  @ApiResponse({ status: 200, description: 'Vaccine added successfully' })
  @ApiResponse({ status: 404, description: 'Clinical history or vaccine not found' })
  async addVaccine(
    @Param('id', ParseIntPipe) id: number,
    @Param('vaccineId', ParseIntPipe) vaccineId: number
  ): Promise<void> {
    return this.clinicalHistoryService.addVaccine(id, vaccineId);
  }

  @Delete(':id/vaccines/:vaccineId')
  @ApiOperation({ summary: 'Remove a vaccine from a history' })
  @ApiResponse({ status: 200, description: 'Vaccine removed successfully' })
  @ApiResponse({ status: 404, description: 'Clinical history or vaccine not found' })
  async removeVaccine(
    @Param('id', ParseIntPipe) id: number,
    @Param('vaccineId', ParseIntPipe) vaccineId: number
  ): Promise<void> {
    return this.clinicalHistoryService.removeVaccine(id, vaccineId);
  }

  @Get(':id/conditions')
  @ApiOperation({ summary: 'Get all conditions for a clinical history' })
  @ApiResponse({ status: 200, description: 'Returns conditions', type: [ClinicalHistory] })
  @ApiResponse({ status: 404, description: 'Clinical history not found' })
  async getConditions(@Param('id', ParseIntPipe) id: number) {
    return this.clinicalHistoryService.getConditions(id);
  }

  @Get(':id/vaccines')
  @ApiOperation({ summary: 'Get all vaccines for a clinical history' })
  @ApiResponse({ status: 200, description: 'Returns vaccines', type: [ClinicalHistory] })
  @ApiResponse({ status: 404, description: 'Clinical history not found' })
  async getVaccines(@Param('id', ParseIntPipe) id: number) {
    return this.clinicalHistoryService.getVaccines(id);
  }
}