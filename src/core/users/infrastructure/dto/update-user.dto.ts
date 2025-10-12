import { IsEmail, IsOptional, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateUserDto {
	@ApiPropertyOptional({ example: '1712345678' })
	@IsOptional()
	@IsString()
	identification?: string;

	@ApiPropertyOptional({ example: 'Juan Perez' })
	@IsOptional()
	@IsString()
	name?: string;

	@ApiPropertyOptional({ example: 'Gonzalez' })
	@IsOptional()
	@IsString()
	fLastName?: string;

	@ApiPropertyOptional({ example: 'Lopez' })
	@IsOptional()
	@IsString()
	sLastName?: string;

	@ApiPropertyOptional({ example: 'juan@example.com' })
	@IsOptional()
	@IsEmail()
	u_email?: string;

	@ApiPropertyOptional({ description: 'Plain text password (will be hashed)' })
	@IsOptional()
	@IsString()
	password?: string;

	@ApiPropertyOptional({ example: 2 })
	@IsOptional()
	@IsNumber()
	roleId?: number;

	@ApiPropertyOptional({ example: true })
	@IsOptional()
	@IsBoolean()
	u_is_active?: boolean;
}
