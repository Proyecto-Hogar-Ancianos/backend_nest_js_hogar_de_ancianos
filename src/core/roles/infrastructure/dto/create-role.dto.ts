import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
	@ApiProperty({ example: 'admin', description: 'Role name' })
	@IsNotEmpty()
	@IsString()
	r_name: string;
}

export default CreateRoleDto;

