import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ClinicalConditionService } from '../services/clinical-condition.service';
import { CreateClinicalConditionDto, UpdateClinicalConditionDto } from '../dtos/clinical-condition.dto';
import { ClinicalCondition } from '../../domain/entities/clinical-condition.entity';

@ApiTags('clinical-conditions')
@Controller('clinical-conditions')
export class ClinicalConditionController {
  constructor(
    private readonly clinicalConditionService: ClinicalConditionService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all clinical conditions' })
  @ApiResponse({ status: 200, description: 'Returns all clinical conditions', type: [ClinicalCondition] })
  async findAll(): Promise<ClinicalCondition[]> {
    return this.clinicalConditionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a clinical condition by ID' })
  @ApiResponse({ status: 200, description: 'Returns the clinical condition', type: ClinicalCondition })
  @ApiResponse({ status: 404, description: 'Clinical condition not found' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<ClinicalCondition> {
    return this.clinicalConditionService.findById(id);
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Get a clinical condition by name' })
  @ApiResponse({ status: 200, description: 'Returns the clinical condition', type: ClinicalCondition })
  @ApiResponse({ status: 404, description: 'Clinical condition not found' })
  async findByName(@Param('name') name: string): Promise<ClinicalCondition> {
    return this.clinicalConditionService.findByName(name);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new clinical condition' })
  @ApiResponse({ status: 201, description: 'Returns the created clinical condition', type: ClinicalCondition })
  async create(@Body() createConditionDto: CreateClinicalConditionDto): Promise<ClinicalCondition> {
    return this.clinicalConditionService.create(createConditionDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a clinical condition' })
  @ApiResponse({ status: 200, description: 'Returns the updated clinical condition', type: ClinicalCondition })
  @ApiResponse({ status: 404, description: 'Clinical condition not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConditionDto: UpdateClinicalConditionDto
  ): Promise<ClinicalCondition> {
    return this.clinicalConditionService.update(id, updateConditionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a clinical condition' })
  @ApiResponse({ status: 200, description: 'Clinical condition successfully deleted' })
  @ApiResponse({ status: 404, description: 'Clinical condition not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.clinicalConditionService.delete(id);
  }
}