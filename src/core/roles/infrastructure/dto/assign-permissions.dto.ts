import { IsArray, ArrayNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignPermissionsDto {
	@ApiProperty({ example: 1 })
	@IsNumber()
	id_role: number;

	@ApiProperty({ type: [String], example: ['create:user', 'update:user'] })
	@IsArray()
	@ArrayNotEmpty()
	permissions: string[];
}

export default AssignPermissionsDto;

