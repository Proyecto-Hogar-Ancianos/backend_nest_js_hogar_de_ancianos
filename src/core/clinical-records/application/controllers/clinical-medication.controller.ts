import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClinicalMedicationService } from '../services/clinical-medication.service';
import { CreateClinicalMedicationDto, UpdateClinicalMedicationDto } from '../dtos/clinical-medication.dto';
import { ClinicalMedication } from '../../domain/entities/clinical-medication.entity';

@ApiTags('clinical-medications')
@Controller('clinical-medications')
export class ClinicalMedicationController {
  constructor(
    private readonly clinicalMedicationService: ClinicalMedicationService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all clinical medications' })
  @ApiResponse({ status: 200, description: 'Returns all clinical medications', type: [ClinicalMedication] })
  async findAll(): Promise<ClinicalMedication[]> {
    return this.clinicalMedicationService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a clinical medication by ID' })
  @ApiResponse({ status: 200, description: 'Returns the clinical medication', type: ClinicalMedication })
  @ApiResponse({ status: 404, description: 'Clinical medication not found' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<ClinicalMedication> {
    return this.clinicalMedicationService.findById(id);
  }

  @Get('history/:historyId')
  @ApiOperation({ summary: 'Get medications by clinical history' })
  @ApiResponse({ status: 200, description: 'Returns medications for the clinical history', type: [ClinicalMedication] })
  async findByClinicalHistory(@Param('historyId', ParseIntPipe) historyId: number): Promise<ClinicalMedication[]> {
    return this.clinicalMedicationService.findByClinicalHistory(historyId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new clinical medication' })
  @ApiResponse({ status: 201, description: 'Returns the created clinical medication', type: ClinicalMedication })
  async create(@Body() createMedicationDto: CreateClinicalMedicationDto): Promise<ClinicalMedication> {
    return this.clinicalMedicationService.create(createMedicationDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a clinical medication' })
  @ApiResponse({ status: 200, description: 'Returns the updated clinical medication', type: ClinicalMedication })
  @ApiResponse({ status: 404, description: 'Clinical medication not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMedicationDto: UpdateClinicalMedicationDto
  ): Promise<ClinicalMedication> {
    return this.clinicalMedicationService.update(id, updateMedicationDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a clinical medication' })
  @ApiResponse({ status: 200, description: 'Clinical medication successfully deleted' })
  @ApiResponse({ status: 404, description: 'Clinical medication not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.clinicalMedicationService.delete(id);
  }
}