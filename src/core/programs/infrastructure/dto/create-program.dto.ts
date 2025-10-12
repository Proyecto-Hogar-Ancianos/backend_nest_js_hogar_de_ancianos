import { IsNotEmpty, IsOptional, IsString, IsNumber, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProgramDto {
	@ApiProperty({ example: 'Health Workshop' })
	@IsNotEmpty()
	@IsString()
	p_name: string;

	@ApiPropertyOptional({ example: 'A program about healthy living' })
	@IsOptional()
	@IsString()
	p_description?: string;

	@ApiProperty({ example: 'workshop' })
	@IsNotEmpty()
	@IsString()
	p_type: string;

	@ApiPropertyOptional({ example: 'Observations' })
	@IsOptional()
	@IsString()
	p_observations?: string;

	@ApiProperty({ example: '2025-01-01' })
	@IsNotEmpty()
	@IsDateString()
	p_start_date: string;

	@ApiPropertyOptional({ example: '2025-06-01' })
	@IsOptional()
	@IsDateString()
	p_end_date?: string;

	@ApiPropertyOptional({ example: 1000.5 })
	@IsOptional()
	@IsNumber()
	p_budget?: number;

	@ApiPropertyOptional({ example: 'active' })
	@IsOptional()
	@IsString()
	p_status?: string;
}
