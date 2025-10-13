import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { OlderAdultService } from '../services/older-adult.service';
import { OlderAdultUpdateService } from '../services/older-adult-update.service';
import { CreateOlderAdultDto, UpdateOlderAdultDto } from '../dtos/older-adult.dto';
import { OlderAdult } from '../../domain/entities/older-adult.entity';

@ApiTags('older-adults')
@Controller('older-adults')
export class OlderAdultController {
  constructor(
    private readonly olderAdultService: OlderAdultService,
    private readonly olderAdultUpdateService: OlderAdultUpdateService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all older adults' })
  @ApiResponse({ status: 200, description: 'Returns all older adults', type: [OlderAdult] })
  async findAll(): Promise<OlderAdult[]> {
    return this.olderAdultService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an older adult by ID' })
  @ApiResponse({ status: 200, description: 'Returns the older adult', type: OlderAdult })
  @ApiResponse({ status: 404, description: 'Older adult not found' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<OlderAdult> {
    return this.olderAdultService.findById(id);
  }

  @Get('identification/:identification')
  @ApiOperation({ summary: 'Get an older adult by identification' })
  @ApiResponse({ status: 200, description: 'Returns the older adult', type: OlderAdult })
  @ApiResponse({ status: 404, description: 'Older adult not found' })
  async findByIdentification(@Param('identification') identification: string): Promise<OlderAdult> {
    return this.olderAdultService.findByIdentification(identification);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new older adult' })
  @ApiResponse({ status: 201, description: 'Returns the created older adult', type: OlderAdult })
  async create(@Body() createOlderAdultDto: CreateOlderAdultDto): Promise<OlderAdult> {
    return this.olderAdultService.create(createOlderAdultDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an older adult' })
  @ApiResponse({ status: 200, description: 'Returns the updated older adult', type: OlderAdult })
  @ApiResponse({ status: 404, description: 'Older adult not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateOlderAdultDto: UpdateOlderAdultDto
  ): Promise<OlderAdult> {
    return this.olderAdultService.update(id, updateOlderAdultDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an older adult' })
  @ApiResponse({ status: 200, description: 'Older adult successfully deleted' })
  @ApiResponse({ status: 404, description: 'Older adult not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.olderAdultService.delete(id);
  }

  @Get(':id/updates')
  @ApiOperation({ summary: 'Get updates history for an older adult' })
  @ApiResponse({ status: 200, description: 'Returns the update history' })
  @ApiResponse({ status: 404, description: 'Older adult not found' })
  async getUpdates(@Param('id', ParseIntPipe) id: number) {
    await this.olderAdultService.findById(id); // Validate older adult exists
    return this.olderAdultUpdateService.findByOlderAdult(id);
  }
}