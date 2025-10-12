import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(@Inject('PermService') private readonly service: any) {}

  @Get()
  @ApiOperation({ summary: 'List permissions' })
  @ApiResponse({ status: 200, description: 'List of permissions' })
  findAll() {
    return this.service.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create permission' })
  @ApiResponse({ status: 201, description: 'Permission created' })
  create(@Body() dto: any) {
    return this.service.create(dto);
  }
}
