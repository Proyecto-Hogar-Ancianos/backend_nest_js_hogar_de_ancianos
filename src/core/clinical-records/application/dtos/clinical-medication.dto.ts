import { IsString, IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClinicalMedicationDto {
  @ApiProperty({ description: 'Medication name and details' })
  @IsString()
  medication: string;

  @ApiProperty({ description: 'Medication dosage' })
  @IsString()
  dosage: string;

  @ApiProperty({
    description: 'Type of treatment',
    enum: ['temporary', 'chronic', 'preventive', 'other'],
    default: 'other'
  })
  @IsEnum(['temporary', 'chronic', 'preventive', 'other'])
  treatmentType: string;

  @ApiProperty({ description: 'ID of the clinical history this medication belongs to' })
  @IsNumber()
  clinicalHistoryId: number;
}

export class UpdateClinicalMedicationDto extends CreateClinicalMedicationDto {}