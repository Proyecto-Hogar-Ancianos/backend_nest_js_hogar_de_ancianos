import { IsString, IsOptional, IsInt, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';

export class CreateMedicalRecordDto {
    @ApiProperty({ description: 'Summary of the medical record' })
    @IsString()
    mr_summary: string;

    @ApiProperty({ description: 'Area of origin (e.g., Medicina General)' })
    @IsString()
    mr_origin_area: string;

    @ApiProperty({ description: 'ID of the older adult (patient)' })
    @IsInt()
    id_older_adult: number;

    @ApiPropertyOptional({ description: 'Date of the record' })
    @IsOptional()
    @IsDateString()
    mr_record_date?: string;

    @ApiPropertyOptional({ description: 'Diagnosis' })
    @IsOptional()
    @IsString()
    mr_diagnosis?: string;

    @ApiPropertyOptional({ description: 'Treatment plan' })
    @IsOptional()
    @IsString()
    mr_treatment?: string;

    @ApiPropertyOptional({ description: 'Observations' })
    @IsOptional()
    @IsString()
    mr_observations?: string;

    @ApiPropertyOptional({ description: 'Name of the person who signed' })
    @IsOptional()
    @IsString()
    mr_signed_by?: string;

    @ApiPropertyOptional({ description: 'ID of the specialized appointment' })
    @IsOptional()
    @IsInt()
    id_appointment?: number;
}

export class UpdateMedicalRecordDto extends PartialType(CreateMedicalRecordDto) {}

export class MedicalRecordFilterDto {
    @ApiPropertyOptional({ description: 'Filter by older adult ID' })
    @IsOptional()
    @IsInt()
    patientId?: number;
}
