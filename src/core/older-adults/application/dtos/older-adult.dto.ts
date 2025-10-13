import {
  IsString,
  IsEmail,
  IsEnum,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsDate,
  MinLength,
  IsUrl
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOlderAdultDto {
  @ApiProperty({ description: 'Older adult identification number' })
  @IsString()
  identification: string;

  @ApiProperty({ description: 'Older adult name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Older adult first last name' })
  @IsString()
  fLastName: string;

  @ApiProperty({ description: 'Older adult second last name', required: false })
  @IsString()
  @IsOptional()
  sLastName?: string;

  @ApiProperty({ description: 'Older adult birth date' })
  @IsDate()
  @Type(() => Date)
  birthdate: Date;

  @ApiProperty({
    description: 'Older adult marital status',
    enum: ['single', 'married', 'divorced', 'widowed', 'common law union', 'separated', 'not specified'],
    default: 'not specified'
  })
  @IsEnum(['single', 'married', 'divorced', 'widowed', 'common law union', 'separated', 'not specified'])
  maritalStatus: string;

  @ApiProperty({ description: 'Older adult dwelling details' })
  @IsString()
  dwelling: string;

  @ApiProperty({
    description: 'Education level',
    enum: [
      'no schooling',
      'incomplete primary',
      'complete primary',
      'incomplete secondary',
      'complete secondary',
      'technical degree',
      'incomplete university',
      'complete university',
      'postgraduate',
      'not specified'
    ],
    default: 'not specified'
  })
  @IsEnum([
    'no schooling',
    'incomplete primary',
    'complete primary',
    'incomplete secondary',
    'complete secondary',
    'technical degree',
    'incomplete university',
    'complete university',
    'postgraduate',
    'not specified'
  ])
  yearsSchooling: string;

  @ApiProperty({ description: 'Previous work experience' })
  @IsString()
  previousWork: string;

  @ApiProperty({ description: 'Whether the older adult is retired' })
  @IsBoolean()
  isRetired: boolean;

  @ApiProperty({ description: 'Whether the older adult receives pension' })
  @IsBoolean()
  hasPension: boolean;

  @ApiProperty({ description: 'Whether there are other income sources' })
  @IsBoolean()
  other: boolean;

  @ApiProperty({ description: 'Description of other income sources', required: false })
  @IsString()
  @IsOptional()
  otherDescription?: string;

  @ApiProperty({ description: 'Area of origin' })
  @IsString()
  areaOfOrigin: string;

  @ApiProperty({ description: 'Number of children', default: 0 })
  @IsNumber()
  childrenCount: number;

  @ApiProperty({ description: 'Economic income in local currency' })
  @IsNumber()
  economicIncome: number;

  @ApiProperty({ description: 'Phone number' })
  @IsString()
  @MinLength(8)
  phoneNumber: string;

  @ApiProperty({ description: 'Email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'URL to profile photo', required: false })
  @IsUrl()
  @IsOptional()
  profilePhotoUrl?: string;

  @ApiProperty({
    description: 'Gender',
    enum: ['male', 'female', 'not specified'],
    default: 'not specified'
  })
  @IsEnum(['male', 'female', 'not specified'])
  gender: string;

  @ApiProperty({
    description: 'Blood type',
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'UNKNOWN'],
    default: 'UNKNOWN'
  })
  @IsEnum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'UNKNOWN'])
  bloodType: string;

  @ApiProperty({ description: 'Program ID if part of any program', required: false })
  @IsNumber()
  @IsOptional()
  programId?: number;

  @ApiProperty({ description: 'Family member ID if any', required: false })
  @IsNumber()
  @IsOptional()
  familyId?: number;
}

export class UpdateOlderAdultDto extends CreateOlderAdultDto {}