import { ApiProperty } from '@nestjs/swagger';

export class VirtualFileResponseDto {
  @ApiProperty({ description: 'Indica si la operación fue exitosa' })
  success: boolean;

  @ApiProperty({ description: 'Mensaje descriptivo del resultado' })
  message: string;

  @ApiProperty({ description: 'ID del expediente virtual creado', required: false })
  virtual_file_id?: number;

  @ApiProperty({ description: 'ID del adulto mayor creado', required: false })
  older_adult_id?: number;

  @ApiProperty({ description: 'ID del familiar creado', required: false })
  family_id?: number;

  @ApiProperty({ description: 'ID del historial clínico creado', required: false })
  clinical_history_id?: number;
}