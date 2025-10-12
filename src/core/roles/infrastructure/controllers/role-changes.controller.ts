import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { CreateRoleChangeDto } from '../dto/create-role-change.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('role_changes')
@Controller('role_changes')
export class RoleChangesController {
  constructor(@Inject('RoleChangeService') private readonly service: any) {}

  @Get()
  @ApiOperation({ summary: 'List role changes' })
  @ApiResponse({ status: 200, description: 'List of role changes' })
  findAll() {
    return this.service.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a role change record' })
  @ApiResponse({ status: 201, description: 'Role change created' })
  create(@Body() dto: CreateRoleChangeDto) {
    return this.service.create(dto);
  }
}

export default RoleChangesController;
