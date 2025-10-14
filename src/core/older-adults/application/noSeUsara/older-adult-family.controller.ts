import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OlderAdultFamilyService } from '../services/older-adult-family.service';
import { CreateOlderAdultFamilyDto, UpdateOlderAdultFamilyDto } from '../dtos/older-adult-family.dto';
import { OlderAdultFamily } from '../../domain/entities/older-adult-family.entity';

@ApiTags('older-adult-family')
@Controller('older-adult-family')
export class OlderAdultFamilyController {
  constructor(
    private readonly olderAdultFamilyService: OlderAdultFamilyService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all family members' })
  @ApiResponse({ status: 200, description: 'Returns all family members', type: [OlderAdultFamily] })
  async findAll(): Promise<OlderAdultFamily[]> {
    return this.olderAdultFamilyService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a family member by ID' })
  @ApiResponse({ status: 200, description: 'Returns the family member', type: OlderAdultFamily })
  @ApiResponse({ status: 404, description: 'Family member not found' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<OlderAdultFamily> {
    return this.olderAdultFamilyService.findById(id);
  }

  @Get('identification/:identification')
  @ApiOperation({ summary: 'Get a family member by identification' })
  @ApiResponse({ status: 200, description: 'Returns the family member', type: OlderAdultFamily })
  @ApiResponse({ status: 404, description: 'Family member not found' })
  async findByIdentification(@Param('identification') identification: string): Promise<OlderAdultFamily> {
    return this.olderAdultFamilyService.findByIdentification(identification);
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Get a family member by email' })
  @ApiResponse({ status: 200, description: 'Returns the family member', type: OlderAdultFamily })
  @ApiResponse({ status: 404, description: 'Family member not found' })
  async findByEmail(@Param('email') email: string): Promise<OlderAdultFamily> {
    return this.olderAdultFamilyService.findByEmail(email);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new family member' })
  @ApiResponse({ status: 201, description: 'Returns the created family member', type: OlderAdultFamily })
  async create(@Body() createFamilyDto: CreateOlderAdultFamilyDto): Promise<OlderAdultFamily> {
    return this.olderAdultFamilyService.create(createFamilyDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a family member' })
  @ApiResponse({ status: 200, description: 'Returns the updated family member', type: OlderAdultFamily })
  @ApiResponse({ status: 404, description: 'Family member not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFamilyDto: UpdateOlderAdultFamilyDto
  ): Promise<OlderAdultFamily> {
    return this.olderAdultFamilyService.update(id, updateFamilyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a family member' })
  @ApiResponse({ status: 200, description: 'Family member successfully deleted' })
  @ApiResponse({ status: 404, description: 'Family member not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.olderAdultFamilyService.delete(id);
  }
}