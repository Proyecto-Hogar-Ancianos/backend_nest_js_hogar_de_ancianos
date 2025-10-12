import { Controller, Get, Post, Put, Delete, Param, Body, Inject } from '@nestjs/common';
import { CreateProgramDto } from '../dto/create-program.dto';
import { AddParticipantDto } from '../dto/add-participant.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('programs')
@Controller('programs')
export class ProgramsController {
	constructor(@Inject('ProgramService') private readonly service: any) {}

	@Get()
	@ApiOperation({ summary: 'List programs' })
	@ApiResponse({ status: 200, description: 'List of programs' })
	findAll() {
		return this.service.findAll();
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get program by id' })
	@ApiResponse({ status: 200, description: 'Program found' })
	findById(@Param('id') id: number) {
		return this.service.findById(Number(id));
	}

	@Post()
	@ApiOperation({ summary: 'Create a program' })
	@ApiResponse({ status: 201, description: 'Program created' })
	create(@Body() dto: CreateProgramDto) {
		return this.service.create(dto);
	}

	@Put(':id')
	@ApiOperation({ summary: 'Update a program' })
	@ApiResponse({ status: 200, description: 'Program updated' })
	update(@Param('id') id: number, @Body() dto: CreateProgramDto) {
		return this.service.update(Number(id), dto);
	}

	@Delete(':id')
	@ApiOperation({ summary: 'Delete a program' })
	@ApiResponse({ status: 200, description: 'Program deleted' })
	delete(@Param('id') id: number) {
		return this.service.delete(Number(id));
	}

	@Post(':id/participants')
	@ApiOperation({ summary: 'Add a participant to a program' })
	@ApiResponse({ status: 201, description: 'Participant added' })
	addParticipant(@Param('id') id: number, @Body() dto: AddParticipantDto) {
		return this.service.addParticipant(Number(id), dto);
	}
}
