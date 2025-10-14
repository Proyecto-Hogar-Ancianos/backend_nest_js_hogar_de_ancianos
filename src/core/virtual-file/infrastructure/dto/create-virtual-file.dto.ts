import { IsString, IsNotEmpty, IsEmail, IsOptional, IsBoolean, IsNumber, IsDateString, IsEnum, ValidateNested, Length, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ProgramDto, FamilyDto, ClinicalHistoryDto } from './nested-dtos.js';

export class CreateVirtualFileDto {
  // Datos del adulto mayor
  @ApiProperty({ description: 'Identificación del adulto mayor' })
  @IsString({ message: 'La identificación debe ser un texto' })
  @IsNotEmpty({ message: 'La identificación es requerida' })
  @Length(1, 20, { message: 'La identificación debe tener entre 1 y 20 caracteres' })
  oa_identification: string;

  @ApiProperty({ description: 'Nombre del adulto mayor' })
  @IsString({ message: 'El nombre debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres' })
  oa_name: string;

  @ApiProperty({ description: 'Primer apellido del adulto mayor' })
  @IsString({ message: 'El primer apellido debe ser un texto' })
  @IsNotEmpty({ message: 'El primer apellido es requerido' })
  @Length(1, 50, { message: 'El primer apellido debe tener entre 1 y 50 caracteres' })
  oa_f_last_name: string;

  @ApiProperty({ description: 'Segundo apellido del adulto mayor', required: false })
  @IsOptional()
  @IsString({ message: 'El segundo apellido debe ser un texto' })
  @Length(1, 50, { message: 'El segundo apellido debe tener entre 1 y 50 caracteres' })
  oa_s_last_name?: string;

  @ApiProperty({ description: 'Fecha de nacimiento (YYYY-MM-DD)' })
  @IsDateString({}, { message: 'La fecha de nacimiento debe ser una fecha válida (YYYY-MM-DD)' })
  @IsNotEmpty({ message: 'La fecha de nacimiento es requerida' })
  oa_birthdate: string;

  @ApiProperty({ 
    description: 'Estado civil',
    enum: ['single', 'married', 'divorced', 'widowed', 'common law union', 'separated', 'not specified']
  })
  @IsEnum(['single', 'married', 'divorced', 'widowed', 'common law union', 'separated', 'not specified'], 
    { message: 'El estado civil debe ser un valor válido' })
  oa_marital_status: string;

  @ApiProperty({ description: 'Vivienda/Domicilio', required: false })
  @IsOptional()
  @IsString({ message: 'La vivienda debe ser un texto' })
  oa_dwelling?: string;

  @ApiProperty({ 
    description: 'Nivel de escolaridad',
    enum: [
      'no schooling', 'incomplete primary', 'complete primary', 'incomplete secondary',
      'complete secondary', 'technical degree', 'incomplete university', 'complete university',
      'postgraduate', 'not specified'
    ]
  })
  @IsEnum([
    'no schooling', 'incomplete primary', 'complete primary', 'incomplete secondary',
    'complete secondary', 'technical degree', 'incomplete university', 'complete university',
    'postgraduate', 'not specified'
  ], { message: 'El nivel de escolaridad debe ser un valor válido' })
  oa_years_schooling: string;

  @ApiProperty({ description: 'Trabajo anterior' })
  @IsString({ message: 'El trabajo anterior debe ser un texto' })
  @IsNotEmpty({ message: 'El trabajo anterior es requerido' })
  @Length(1, 300, { message: 'El trabajo anterior debe tener entre 1 y 300 caracteres' })
  oa_previous_work: string;

  @ApiProperty({ description: '¿Está jubilado?' })
  @IsBoolean({ message: 'El estado de jubilación debe ser verdadero o falso' })
  oa_is_retired: boolean;

  @ApiProperty({ description: '¿Tiene pensión?' })
  @IsBoolean({ message: 'El estado de pensión debe ser verdadero o falso' })
  oa_has_pension: boolean;

  @ApiProperty({ description: '¿Tiene otros ingresos?' })
  @IsBoolean({ message: 'El estado de otros ingresos debe ser verdadero o falso' })
  oa_other: boolean;

  @ApiProperty({ description: 'Descripción de otros ingresos', required: false })
  @IsOptional()
  @IsString({ message: 'La descripción de otros ingresos debe ser un texto' })
  @Length(0, 300, { message: 'La descripción debe tener máximo 300 caracteres' })
  oa_other_description?: string;

  @ApiProperty({ description: 'Área de origen', required: false })
  @IsOptional()
  @IsString({ message: 'El área de origen debe ser un texto' })
  @Length(0, 300, { message: 'El área de origen debe tener máximo 300 caracteres' })
  oa_area_of_origin?: string;

  @ApiProperty({ description: 'Cantidad de hijos' })
  @IsNumber({}, { message: 'La cantidad de hijos debe ser un número' })
  @Min(0, { message: 'La cantidad de hijos debe ser mayor o igual a 0' })
  @Max(255, { message: 'La cantidad de hijos debe ser menor a 256' })
  oa_children_count: number;

  @ApiProperty({ 
    description: 'Estado de vida',
    enum: ['alive', 'dead']
  })
  @IsEnum(['alive', 'dead'], { message: 'El estado debe ser "alive" o "dead"' })
  oa_status: string;

  @ApiProperty({ description: 'Fecha de muerte (si aplica)', required: false })
  @IsOptional()
  @IsDateString({}, { message: 'La fecha de muerte debe ser una fecha válida (YYYY-MM-DD)' })
  oa_death_date?: string;

  @ApiProperty({ description: 'Ingreso económico en colones', required: false })
  @IsOptional()
  @IsNumber({}, { message: 'El ingreso económico debe ser un número' })
  @Min(0, { message: 'El ingreso económico debe ser mayor o igual a 0' })
  @Max(99999999.99, { message: 'El ingreso económico excede el límite permitido' })
  oa_economic_income?: number;

  @ApiProperty({ description: 'Número de teléfono', required: false })
  @IsOptional()
  @IsString({ message: 'El teléfono debe ser un texto' })
  @Length(1, 20, { message: 'El teléfono debe tener entre 1 y 20 caracteres' })
  oa_phone_numner?: string;

  @ApiProperty({ description: 'Email del adulto mayor', required: false })
  @IsOptional()
  @IsEmail({}, { message: 'El email debe ser válido' })
  @Length(1, 256, { message: 'El email debe tener máximo 256 caracteres' })
  oa_email?: string;

  @ApiProperty({ description: 'URL de la foto de perfil', required: false })
  @IsOptional()
  @IsString({ message: 'La URL de la foto debe ser un texto' })
  @Length(1, 255, { message: 'La URL de la foto debe tener máximo 255 caracteres' })
  oa_profile_photo_url?: string;

  @ApiProperty({ 
    description: 'Género',
    enum: ['male', 'female', 'not specified']
  })
  @IsEnum(['male', 'female', 'not specified'], 
    { message: 'El género debe ser "male", "female" o "not specified"' })
  oa_gender: string;

  @ApiProperty({ 
    description: 'Tipo de sangre',
    enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'UNKNOWN']
  })
  @IsEnum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'UNKNOWN'], 
    { message: 'El tipo de sangre debe ser un valor válido' })
  oa_blood_type: string;

  // Relaciones
  @ApiProperty({ description: 'Información del programa', required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => ProgramDto)
  program?: ProgramDto;

  @ApiProperty({ description: 'Información del familiar a cargo' })
  @ValidateNested()
  @Type(() => FamilyDto)
  family: FamilyDto;

  @ApiProperty({ description: 'Historial clínico completo' })
  @ValidateNested()
  @Type(() => ClinicalHistoryDto)
  clinical_history: ClinicalHistoryDto;
}