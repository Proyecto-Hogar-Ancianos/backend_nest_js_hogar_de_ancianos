import { Controller, Get, Post, Put, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EmergencyContactService } from '../services/emergency-contact.service';
import { CreateEmergencyContactDto, UpdateEmergencyContactDto } from '../dtos/emergency-contact.dto';
import { EmergencyContact } from '../../domain/entities/emergency-contact.entity';

@ApiTags('emergency-contacts')
@Controller('emergency-contacts')
export class EmergencyContactController {
  constructor(
    private readonly emergencyContactService: EmergencyContactService
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all emergency contacts' })
  @ApiResponse({ status: 200, description: 'Returns all emergency contacts', type: [EmergencyContact] })
  async findAll(): Promise<EmergencyContact[]> {
    return this.emergencyContactService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an emergency contact by ID' })
  @ApiResponse({ status: 200, description: 'Returns the emergency contact', type: EmergencyContact })
  @ApiResponse({ status: 404, description: 'Emergency contact not found' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<EmergencyContact> {
    return this.emergencyContactService.findById(id);
  }

  @Get('older-adult/:id')
  @ApiOperation({ summary: 'Get emergency contacts for an older adult' })
  @ApiResponse({ status: 200, description: 'Returns the emergency contacts', type: [EmergencyContact] })
  async findByOlderAdult(@Param('id', ParseIntPipe) olderAdultId: number): Promise<EmergencyContact[]> {
    return this.emergencyContactService.findByOlderAdult(olderAdultId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new emergency contact' })
  @ApiResponse({ status: 201, description: 'Returns the created emergency contact', type: EmergencyContact })
  async create(@Body() createContactDto: CreateEmergencyContactDto): Promise<EmergencyContact> {
    return this.emergencyContactService.create(createContactDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an emergency contact' })
  @ApiResponse({ status: 200, description: 'Returns the updated emergency contact', type: EmergencyContact })
  @ApiResponse({ status: 404, description: 'Emergency contact not found' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateContactDto: UpdateEmergencyContactDto
  ): Promise<EmergencyContact> {
    return this.emergencyContactService.update(id, updateContactDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an emergency contact' })
  @ApiResponse({ status: 200, description: 'Emergency contact successfully deleted' })
  @ApiResponse({ status: 404, description: 'Emergency contact not found' })
  async delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.emergencyContactService.delete(id);
  }
}