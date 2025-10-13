import { IsBoolean, IsNumber, IsString, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClinicalHistoryDto {
  @ApiProperty({ description: 'Whether the patient has frequent falls', default: false })
  @IsBoolean()
  frequentFalls: boolean;

  @ApiProperty({ description: 'Patient weight in kg', required: false })
  @IsNumber()
  @IsOptional()
  weight?: number;

  @ApiProperty({ description: 'Patient height in meters', required: false })
  @IsNumber()
  @IsOptional()
  height?: number;

  @ApiProperty({ description: 'Body Mass Index', required: false })
  @IsNumber()
  @IsOptional()
  imc?: number;

  @ApiProperty({ description: 'Blood pressure (e.g., "120/80")', required: false })
  @IsString()
  @IsOptional()
  bloodPressure?: string;

  @ApiProperty({ description: 'Whether the patient has neoplasms', default: false })
  @IsBoolean()
  neoplasms: boolean;

  @ApiProperty({ description: 'Description of neoplasms if present', required: false })
  @IsString()
  @IsOptional()
  neoplasmsDescription?: string;

  @ApiProperty({ description: 'General observations', required: false })
  @IsString()
  @IsOptional()
  observations?: string;

  @ApiProperty({
    description: 'Global Cardiovascular Risk',
    enum: ['< 10%', 'e /10y20%', 'e /20y30%', 'e /40y40%', '> 40%', 'UNKNOWN'],
    default: 'UNKNOWN'
  })
  @IsEnum(['< 10%', 'e /10y20%', 'e /20y30%', 'e /40y40%', '> 40%', 'UNKNOWN'])
  rcvg: string;

  @ApiProperty({ description: 'Whether the patient has vision problems', default: false })
  @IsBoolean()
  visionProblems: boolean;

  @ApiProperty({ description: 'Whether the patient has hearing problems', default: false })
  @IsBoolean()
  visionHearing: boolean;
}

export class UpdateClinicalHistoryDto extends CreateClinicalHistoryDto {}