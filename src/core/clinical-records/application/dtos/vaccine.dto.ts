import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateVaccineDto {
  @ApiProperty({ description: 'Name of the vaccine' })
  @IsString()
  name: string;
}

export class UpdateVaccineDto extends CreateVaccineDto {}