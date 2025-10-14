import { Controller, Post, Body, HttpStatus, HttpException, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { CreateVirtualFileDto } from '../dto/create-virtual-file.dto';
import { VirtualFileResponseDto } from '../dto/response.dto';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { Roles } from '../../../../common/decorators/roles.decorator';
import { RolesGuard } from '../../../../common/guards/roles.guard';

@ApiTags('Virtual Files')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('virtual-files')
export class VirtualFileController {
  constructor(private readonly dataSource: DataSource) {}

  @Post()
  @Roles('admin', 'doctor', 'nurse')
  @ApiOperation({ 
    summary: 'Crear expediente virtual',
    description: 'Crea un nuevo expediente virtual completo con toda la información del adulto mayor, familiar e historial clínico'
  })
  @ApiResponse({ 
    status: 201, 
    description: 'Expediente virtual creado exitosamente',
    type: VirtualFileResponseDto 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Datos inválidos o error en la validación' 
  })
  @ApiResponse({ 
    status: 500, 
    description: 'Error interno del servidor' 
  })
  async createVirtualFile(@Body() createVirtualFileDto: CreateVirtualFileDto): Promise<VirtualFileResponseDto> {
    try {
      const params = this.transformDtoToStoredProcedureParams(createVirtualFileDto);
      
      const result = await this.dataSource.query(
        'CALL CreateVirtualFile(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', 
        params
      );
      
      const [resultData] = result[0];
      
      return {
        success: true,
        message: 'Expediente virtual creado exitosamente',
        virtual_file_id: resultData?.virtual_file_id,
        older_adult_id: resultData?.older_adult_id,
        family_id: resultData?.family_id,
        clinical_history_id: resultData?.clinical_history_id
      };
      
    } catch (error) {
      console.error('Error al crear expediente virtual:', error);
      
      if (error.code === 'ER_DUP_ENTRY') {
        throw new HttpException(
          'Ya existe un expediente virtual con esta identificación',
          HttpStatus.CONFLICT
        );
      }
      
      throw new HttpException(
        'Error interno al crear el expediente virtual',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  private transformDtoToStoredProcedureParams(dto: CreateVirtualFileDto): any[] {
    const clinicalConditionsIds = dto.clinical_history.clinical_conditions.map(cc => cc.id).join(',');
    const vaccinesIds = dto.clinical_history.vaccines.map(v => v.id).join(',');
    const subProgramsIds = dto.program?.sub_programs?.map(sp => sp.id).join(',') || '';
    const medicationsJson = JSON.stringify(dto.clinical_history.medications);

    return [
      dto.oa_identification,
      dto.oa_name,
      dto.oa_f_last_name,
      dto.oa_s_last_name || '',
      dto.oa_birthdate,
      dto.oa_marital_status,
      dto.oa_dwelling || null,
      dto.oa_years_schooling,
      dto.oa_previous_work,
      dto.oa_is_retired,
      dto.oa_has_pension,
      dto.oa_other,
      dto.oa_other_description || null,
      dto.oa_area_of_origin,
      dto.oa_children_count,
      dto.oa_status,
      dto.oa_death_date || null,
      dto.oa_economic_income || null,
      dto.oa_phone_numner || null,
      dto.oa_email || null,
      dto.oa_profile_photo_url || null,
      dto.oa_gender,
      dto.oa_blood_type,
      
      dto.program?.id || null,
      
      dto.family.pf_identification,
      dto.family.pf_name,
      dto.family.pf_f_last_name,
      dto.family.pf_s_last_name,
      dto.family.pf_phone_number,
      dto.family.pf_email,
      dto.family.pf_kinship,
      
      dto.clinical_history.ch_frequent_falls,
      dto.clinical_history.ch_weight,
      dto.clinical_history.ch_height,
      dto.clinical_history.ch_imc,
      dto.clinical_history.ch_blood_pressure,
      dto.clinical_history.ch_neoplasms,
      dto.clinical_history.ch_neoplasms_description || null,
      dto.clinical_history.ch_observations,
      dto.clinical_history.ch_rcvg,
      dto.clinical_history.ch_vision_problems,
      dto.clinical_history.ch_vision_hearing,
      
      clinicalConditionsIds || null,
      vaccinesIds || null,
      subProgramsIds || null,
      medicationsJson
    ];
  }
}