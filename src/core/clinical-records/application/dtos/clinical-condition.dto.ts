import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClinicalConditionDto {
  @ApiProperty({ description: 'Name of the clinical condition' })
  @IsString()
  name: string;
}

export class UpdateClinicalConditionDto extends CreateClinicalConditionDto {}