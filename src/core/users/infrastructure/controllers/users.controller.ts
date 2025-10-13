import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { UsersService } from '../../application/services/users.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { UserResponseDto } from '../dto/user-response.dto';
import { toUserResponse, toUserResponseList } from '../mappers/user.mapper';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../../common/guards/roles.guard';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	@ApiOperation({ summary: 'List users' })
	@ApiResponse({ status: 200, description: 'List of users', type: [UserResponseDto] })
	async findAll(): Promise<UserResponseDto[]> {
		const users = await this.usersService.findAll();
		return toUserResponseList(users);
	}

	@Get(':id')
	@ApiOperation({ summary: 'Get user by id' })
	@ApiResponse({ status: 200, description: 'User found', type: UserResponseDto })
	async findById(@Param('id') id: number): Promise<UserResponseDto> {
		const user = await this.usersService.findById(id);
		return toUserResponse(user || {});
	}

	@Post()
	@Roles('super admin', 'admin')
	@ApiOperation({ summary: 'Create a user' })
	@ApiResponse({ status: 201, description: 'User created', type: UserResponseDto })
	async create(@Body() dto: CreateUserDto): Promise<UserResponseDto> {
		const user = await this.usersService.create(dto as any);
		return toUserResponse(user);
	}

	@Put(':id')
	@Roles('super admin', 'admin')
	@ApiOperation({ summary: 'Update a user' })
	@ApiResponse({ status: 200, description: 'User updated', type: UserResponseDto })
	async update(@Param('id') id: number, @Body() dto: UpdateUserDto): Promise<UserResponseDto> {
		const user = await this.usersService.update(id, dto as any);
		return toUserResponse(user);
	}

	@Delete(':id')
	@Roles('super admin')
	@ApiOperation({ summary: 'Delete a user' })
	@ApiResponse({ status: 200, description: 'User deleted' })
	async delete(@Param('id') id: number): Promise<void> {
		return this.usersService.delete(id);
	}
}
