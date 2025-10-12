import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { CreateRoleDto } from '../dto/create-role.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
	constructor(@Inject('RoleService') private readonly service: any) {}

	@Get()
	@ApiOperation({ summary: 'List roles' })
	@ApiResponse({ status: 200, description: 'List of roles' })
	findAll() {
		return this.service.findAll();
	}

	@Post()
	@ApiOperation({ summary: 'Create role' })
	@ApiResponse({ status: 201, description: 'Role created' })
	create(@Body() dto: CreateRoleDto) {
		return this.service.create(dto);
	}
}

