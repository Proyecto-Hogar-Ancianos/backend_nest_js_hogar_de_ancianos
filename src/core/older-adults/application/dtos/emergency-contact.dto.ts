import { IsString, IsNumber, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmergencyContactDto {
  @ApiProperty({ description: 'Emergency contact phone number' })
  @IsString()
  @MinLength(8)
  phoneNumber: string;

  @ApiProperty({ description: 'ID of the older adult this contact belongs to' })
  @IsNumber()
  olderAdultId: number;
}

export class UpdateEmergencyContactDto extends CreateEmergencyContactDto {}