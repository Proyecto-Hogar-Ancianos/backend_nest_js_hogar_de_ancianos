import { IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class AddParticipantDto {
	@ApiProperty({ example: '1712345678' })
	@IsNotEmpty()
	@IsString()
	pp_identification: string;

	@ApiProperty({ example: 'John' })
	@IsNotEmpty()
	@IsString()
	pp_name: string;

	@ApiPropertyOptional({ example: 'Gonzalez' })
	@IsOptional()
	@IsString()
	pp_f_last_name?: string;

	@ApiPropertyOptional({ example: 'Lopez' })
	@IsOptional()
	@IsString()
	pp_s_last_name?: string;

	@ApiProperty({ example: 'participant' })
	@IsNotEmpty()
	@IsString()
	pp_role: string;

	@ApiProperty({ example: 1 })
	@IsNotEmpty()
	@IsNumber()
	id_program: number;
}
