import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { VaccineService } from '../services/vaccine.service';
import { CreateVaccineDto, UpdateVaccineDto } from '../dtos/vaccine.dto';
import { Vaccine } from '../../domain/entities/vaccine.entity';

@ApiTags('vaccines')
@Controller('vaccines')
export class VaccineController {
  constructor(
    private readonly vaccineService: VaccineService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all vaccines' })
  @ApiResponse({ status: 200, description: 'Returns all vaccines', type: [Vaccine] })
  async findAll(): Promise<Vaccine[]> {
    return this.vaccineService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a vaccine by ID' })
  @ApiResponse({ status: 200, description: 'Returns the vaccine', type: Vaccine })
  @ApiResponse({ status: 404, description: 'Vaccine not found' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<Vaccine> {
    return this.vaccineService.findById(id);
  }

  @Get('name/:name')
  @ApiOperation({ summary: 'Get a vaccine by name' })
  @ApiResponse({ status: 200, description: 'Returns the vaccine', type: Vaccine })
  @ApiResponse({ status: 404, description: 'Vaccine not found' })
  async findByName(@Param('name') name: string): Promise<Vaccine> {
    return this.vaccineService.findByName(name);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new vaccine' })
  @ApiResponse({ status: 201, description: 'Returns the created vaccine', type: Vaccine })
  async create(@Body() createVaccineDto: CreateVaccineDto): Promise<Vaccine> {
    return this.vaccineService.create(createVaccineDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a vaccine' })
  @ApiResponse({ status: 200, description: 'Returns the updated vaccine', type: Vaccine })
  @ApiResponse({ status: 404, description: 'Vaccine not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateVaccineDto: UpdateVaccineDto
  ): Promise<Vaccine> {
    return this.vaccineService.update(id, updateVaccineDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a vaccine' })
  @ApiResponse({ status: 200, description: 'Vaccine successfully deleted' })
  @ApiResponse({ status: 404, description: 'Vaccine not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.vaccineService.delete(id);
  }
}