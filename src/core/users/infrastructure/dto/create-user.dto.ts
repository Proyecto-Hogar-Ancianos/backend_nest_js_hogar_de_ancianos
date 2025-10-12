import { IsEmail, IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
	@ApiProperty({ example: '1712345678' })
	@IsNotEmpty()
	@IsString()
	identification: string;

	@ApiProperty({ example: 'Juan Perez' })
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty({ example: 'Gonzalez' })
	@IsNotEmpty()
	@IsString()
	fLastName: string;

	@ApiProperty({ example: 'Lopez', required: false })
	@IsString()
	sLastName?: string;

	@ApiProperty({ example: 'juan@example.com' })
	@IsEmail()
	u_email: string;

	@ApiProperty({ description: "Plain text password for creation (will be hashed)", example: 'secret' })
	@IsNotEmpty()
	@IsString()
	password: string;

	@ApiProperty({ example: 2 })
	@IsNotEmpty()
	@IsNumber()
	roleId: number;
}
