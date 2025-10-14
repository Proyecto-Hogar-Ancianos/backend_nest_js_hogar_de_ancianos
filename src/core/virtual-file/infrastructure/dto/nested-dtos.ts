import { IsString, IsNotEmpty, IsEmail, IsOptional, IsNumber, IsArray, ValidateNested, Length, Min, Max, IsBoolean, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SubProgramDto {
  @ApiProperty({ description: 'ID del sub-programa' })
  @IsNumber({}, { message: 'El ID del sub-programa debe ser un número' })
  id: number;
}

export class ProgramDto {
  @ApiProperty({ description: 'ID del programa' })
  @IsNumber({}, { message: 'El ID del programa debe ser un número' })
  id: number;

  @ApiProperty({ description: 'Sub-programas asociados', type: [SubProgramDto] })
  @IsArray({ message: 'Los sub-programas deben ser un arreglo' })
  @ValidateNested({ each: true })
  @Type(() => SubProgramDto)
  sub_programs: SubProgramDto[];
}

export class FamilyDto {
  @ApiProperty({ description: 'Identificación del familiar' })
  @IsString({ message: 'La identificación del familiar debe ser un texto' })
  @IsNotEmpty({ message: 'La identificación del familiar es requerida' })
  @Length(1, 20, { message: 'La identificación debe tener entre 1 y 20 caracteres' })
  pf_identification: string;

  @ApiProperty({ description: 'Nombre del familiar' })
  @IsString({ message: 'El nombre del familiar debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre del familiar es requerido' })
  @Length(1, 50, { message: 'El nombre debe tener entre 1 y 50 caracteres' })
  pf_name: string;

  @ApiProperty({ description: 'Primer apellido del familiar' })
  @IsString({ message: 'El primer apellido del familiar debe ser un texto' })
  @IsNotEmpty({ message: 'El primer apellido del familiar es requerido' })
  @Length(1, 50, { message: 'El primer apellido debe tener entre 1 y 50 caracteres' })
  pf_f_last_name: string;

  @ApiProperty({ description: 'Segundo apellido del familiar' })
  @IsString({ message: 'El segundo apellido del familiar debe ser un texto' })
  @IsNotEmpty({ message: 'El segundo apellido del familiar es requerido' })
  @Length(1, 50, { message: 'El segundo apellido debe tener entre 1 y 50 caracteres' })
  pf_s_last_name: string;

  @ApiProperty({ description: 'Teléfono del familiar' })
  @IsString({ message: 'El teléfono del familiar debe ser un texto' })
  @IsNotEmpty({ message: 'El teléfono del familiar es requerido' })
  @Length(1, 20, { message: 'El teléfono debe tener entre 1 y 20 caracteres' })
  pf_phone_number: string;

  @ApiProperty({ description: 'Email del familiar' })
  @IsEmail({}, { message: 'El email del familiar debe ser válido' })
  @IsNotEmpty({ message: 'El email del familiar es requerido' })
  @Length(1, 256, { message: 'El email debe tener máximo 256 caracteres' })
  pf_email: string;

  @ApiProperty({ description: 'Parentesco con el adulto mayor' })
  @IsString({ message: 'El parentesco debe ser un texto' })
  @IsNotEmpty({ message: 'El parentesco es requerido' })
  @Length(1, 20, { message: 'El parentesco debe tener entre 1 y 20 caracteres' })
  pf_kinship: string;
}

export class ClinicalConditionDto {
  @ApiProperty({ description: 'ID de la condición clínica' })
  @IsNumber({}, { message: 'El ID de la condición clínica debe ser un número' })
  id: number;
}

export class VaccineDto {
  @ApiProperty({ description: 'ID de la vacuna' })
  @IsNumber({}, { message: 'El ID de la vacuna debe ser un número' })
  id: number;
}

export class MedicationDto {
  @ApiProperty({ description: 'Nombre del medicamento' })
  @IsString({ message: 'El nombre del medicamento debe ser un texto' })
  @IsNotEmpty({ message: 'El nombre del medicamento es requerido' })
  m_medication: string;

  @ApiProperty({ description: 'Dosis del medicamento' })
  @IsString({ message: 'La dosis del medicamento debe ser un texto' })
  @IsNotEmpty({ message: 'La dosis del medicamento es requerida' })
  m_dosage: string;

  @ApiProperty({ description: 'Tipo de tratamiento' })
  @IsString({ message: 'El tipo de tratamiento debe ser un texto' })
  @IsNotEmpty({ message: 'El tipo de tratamiento es requerido' })
  m_treatment_type: string;
}

export class ClinicalHistoryDto {
  @ApiProperty({ description: 'Tiene caídas frecuentes' })
  @IsBoolean({ message: 'Las caídas frecuentes debe ser un valor booleano' })
  ch_frequent_falls: boolean;

  @ApiProperty({ description: 'Peso en kg' })
  @IsNumber({}, { message: 'El peso debe ser un número' })
  @Min(0, { message: 'El peso debe ser mayor a 0' })
  @Max(999.99, { message: 'El peso excede el límite permitido' })
  ch_weight: number;

  @ApiProperty({ description: 'Altura en metros' })
  @IsNumber({}, { message: 'La altura debe ser un número' })
  @Min(0, { message: 'La altura debe ser mayor a 0' })
  @Max(99.99, { message: 'La altura excede el límite permitido' })
  ch_height: number;

  @ApiProperty({ description: 'Índice de masa corporal' })
  @IsNumber({}, { message: 'El IMC debe ser un número' })
  @Min(0, { message: 'El IMC debe ser mayor a 0' })
  @Max(999.9, { message: 'El IMC excede el límite permitido' })
  ch_imc: number;

  @ApiProperty({ description: 'Presión arterial' })
  @IsString({ message: 'La presión arterial debe ser un texto' })
  @IsNotEmpty({ message: 'La presión arterial es requerida' })
  @Length(1, 7, { message: 'La presión arterial debe tener máximo 7 caracteres' })
  ch_blood_pressure: string;

  @ApiProperty({ description: 'Tiene neoplasmas' })
  @IsBoolean({ message: 'Los neoplasmas debe ser un valor booleano' })
  ch_neoplasms: boolean;

  @ApiProperty({ description: 'Descripción de neoplasmas', required: false })
  @IsOptional()
  @IsString({ message: 'La descripción de neoplasmas debe ser un texto' })
  @Length(1, 300, { message: 'La descripción de neoplasmas debe tener máximo 300 caracteres' })
  ch_neoplasms_description?: string;

  @ApiProperty({ description: 'Observaciones del historial clínico' })
  @IsString({ message: 'Las observaciones deben ser un texto' })
  @IsNotEmpty({ message: 'Las observaciones son requeridas' })
  ch_observations: string;

  @ApiProperty({ description: 'RCVG' })
  @IsString({ message: 'El RCVG debe ser un texto' })
  @IsNotEmpty({ message: 'El RCVG es requerido' })
  @Length(1, 20, { message: 'El RCVG debe tener máximo 20 caracteres' })
  ch_rcvg: string;

  @ApiProperty({ description: 'Tiene problemas de visión' })
  @IsBoolean({ message: 'Los problemas de visión debe ser un valor booleano' })
  ch_vision_problems: boolean;

  @ApiProperty({ description: 'Tiene problemas de audición' })
  @IsBoolean({ message: 'Los problemas de audición debe ser un valor booleano' })
  ch_vision_hearing: boolean;

  @ApiProperty({ description: 'Fecha de creación del historial' })
  @IsDateString({}, { message: 'La fecha de creación debe ser una fecha válida' })
  @IsNotEmpty({ message: 'La fecha de creación es requerida' })
  create_at: string;

  @ApiProperty({ description: 'Condiciones clínicas', type: [ClinicalConditionDto] })
  @IsArray({ message: 'Las condiciones clínicas deben ser un arreglo' })
  @ValidateNested({ each: true })
  @Type(() => ClinicalConditionDto)
  clinical_conditions: ClinicalConditionDto[];

  @ApiProperty({ description: 'Vacunas aplicadas', type: [VaccineDto] })
  @IsArray({ message: 'Las vacunas deben ser un arreglo' })
  @ValidateNested({ each: true })
  @Type(() => VaccineDto)
  vaccines: VaccineDto[];

  @ApiProperty({ description: 'Medicamentos actuales', type: [MedicationDto] })
  @IsArray({ message: 'Los medicamentos deben ser un arreglo' })
  @ValidateNested({ each: true })
  @Type(() => MedicationDto)
  medications: MedicationDto[];
}