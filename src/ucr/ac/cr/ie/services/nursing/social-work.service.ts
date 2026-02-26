import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { SocialWorkReport } from '../../domain/nursing';
import { SpecializedAppointment, SpecializedAreaName } from '../../domain/nursing';
import { CreateSocialWorkReportDto, UpdateSocialWorkReportDto } from '../../dto/nursing';

@Injectable()
export class SocialWorkService {
    constructor(
        @Inject('SocialWorkReportRepository')
        private readonly socialWorkRepository: Repository<SocialWorkReport>,
        @Inject('SpecializedAppointmentRepository')
        private readonly appointmentRepository: Repository<SpecializedAppointment>,
    ) {}

    async createSocialWorkReport(dto: CreateSocialWorkReportDto): Promise<{ message: string; data: SocialWorkReport }> {
        try {
            let appointment: SpecializedAppointment | null = null;
            if (dto.id_appointment) {
                appointment = await this.appointmentRepository.findOne({
                    where: { id: dto.id_appointment },
                    relations: ['area']
                });
                if (!appointment) throw new NotFoundException('Appointment not found');
                if (appointment.area.saName !== SpecializedAreaName.SOCIAL_WORK)
                    throw new BadRequestException('Appointment does not belong to social work');
            }
            const reportData: Partial<SocialWorkReport> = {
                sw_date: dto.sw_date ? new Date(dto.sw_date) : null,
                sw_visit_type: dto.sw_visit_type ?? null,
                sw_family_relationship: dto.sw_family_relationship ?? null,
                sw_economic_assessment: dto.sw_economic_assessment ?? null,
                sw_social_support: dto.sw_social_support ?? null,
                sw_observations: dto.sw_observations ?? null,
                sw_recommendations: dto.sw_recommendations ?? null,
                id_appointment: appointment,
            };
            const report = this.socialWorkRepository.create(reportData);
            const savedReport = await this.socialWorkRepository.save(report);
            return { message: 'Social work report created successfully', data: savedReport };
        } catch (error) { throw error; }
    }

    async getSocialWorkReports(patientId?: number): Promise<{ message: string; data: SocialWorkReport[] }> {
        try {
            const query = this.socialWorkRepository
                .createQueryBuilder('report')
                .leftJoinAndSelect('report.id_appointment', 'appointment')
                .leftJoinAndSelect('appointment.patient', 'patient')
                .orderBy('report.sw_date', 'DESC');
            if (patientId) query.andWhere('patient.id = :patientId', { patientId });
            const reports = await query.getMany();
            return { message: 'Social work reports retrieved successfully', data: reports };
        } catch (error) { throw error; }
    }

    async getSocialWorkReportById(id: number): Promise<{ message: string; data: SocialWorkReport }> {
        try {
            const report = await this.socialWorkRepository.findOne({
                where: { id },
                relations: ['id_appointment', 'id_appointment.patient']
            });
            if (!report) throw new NotFoundException('Social work report not found');
            return { message: 'Social work report retrieved successfully', data: report };
        } catch (error) { throw error; }
    }

    async updateSocialWorkReport(id: number, dto: UpdateSocialWorkReportDto): Promise<{ message: string; data: SocialWorkReport }> {
        try {
            const report = await this.socialWorkRepository.findOne({ where: { id }, relations: ['id_appointment'] });
            if (!report) throw new NotFoundException('Social work report not found');
            const updateData: Partial<SocialWorkReport> = {};
            if (dto.sw_date !== undefined) updateData.sw_date = dto.sw_date ? new Date(dto.sw_date) : null;
            if (dto.sw_visit_type !== undefined) updateData.sw_visit_type = dto.sw_visit_type ?? null;
            if (dto.sw_family_relationship !== undefined) updateData.sw_family_relationship = dto.sw_family_relationship ?? null;
            if (dto.sw_economic_assessment !== undefined) updateData.sw_economic_assessment = dto.sw_economic_assessment ?? null;
            if (dto.sw_social_support !== undefined) updateData.sw_social_support = dto.sw_social_support ?? null;
            if (dto.sw_observations !== undefined) updateData.sw_observations = dto.sw_observations ?? null;
            if (dto.sw_recommendations !== undefined) updateData.sw_recommendations = dto.sw_recommendations ?? null;
            if (dto.id_appointment !== undefined) {
                const appt = await this.appointmentRepository.findOne({ where: { id: dto.id_appointment }, relations: ['area'] });
                if (!appt) throw new NotFoundException('Appointment not found');
                if (appt.area.saName !== SpecializedAreaName.SOCIAL_WORK)
                    throw new BadRequestException('Appointment does not belong to social work');
                updateData.id_appointment = appt;
            }
            await this.socialWorkRepository.save({ ...report, ...updateData });
            const updated = await this.socialWorkRepository.findOne({ where: { id }, relations: ['id_appointment', 'id_appointment.patient'] });
            return { message: 'Social work report updated successfully', data: updated };
        } catch (error) { throw error; }
    }

    async deleteSocialWorkReport(id: number): Promise<{ message: string }> {
        try {
            const report = await this.socialWorkRepository.findOne({ where: { id } });
            if (!report) throw new NotFoundException('Social work report not found');
            await this.socialWorkRepository.delete(id);
            return { message: 'Social work report deleted successfully' };
        } catch (error) { throw error; }
    }
}

