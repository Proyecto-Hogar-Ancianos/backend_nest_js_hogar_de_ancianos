import { IsString, IsEmail, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOlderAdultFamilyDto {
  @ApiProperty({ description: 'Family member identification number' })
  @IsString()
  identification: string;

  @ApiProperty({ description: 'Family member name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Family member first last name' })
  @IsString()
  fLastName: string;

  @ApiProperty({ description: 'Family member second last name' })
  @IsString()
  sLastName: string;

  @ApiProperty({ description: 'Family member phone number', required: false })
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ description: 'Family member email address' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Family member relationship with the older adult',
    enum: [
      'son', 'daughter', 'grandson', 'granddaughter', 'brother', 'sister',
      'nephew', 'niece', 'husband', 'wife', 'legal guardian', 'other', 'not specified'
    ],
    default: 'not specified'
  })
  @IsEnum([
    'son', 'daughter', 'grandson', 'granddaughter', 'brother', 'sister',
    'nephew', 'niece', 'husband', 'wife', 'legal guardian', 'other', 'not specified'
  ])
  kinship: string;
}

export class UpdateOlderAdultFamilyDto extends CreateOlderAdultFamilyDto {}