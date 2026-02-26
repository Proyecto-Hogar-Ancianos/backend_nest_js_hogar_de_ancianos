import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { MedicalRecord } from '../../domain/nursing';
import { OlderAdult } from '../../domain/virtual-records';
import { User } from '../../domain/auth/core';
import { SpecializedAppointment } from '../../domain/nursing';
import { CreateMedicalRecordDto, UpdateMedicalRecordDto } from '../../dto/nursing';

@Injectable()
export class MedicalRecordService {
    constructor(
        @Inject('MedicalRecordRepository')
        private readonly medicalRecordRepository: Repository<MedicalRecord>,
    ) {}

    async createMedicalRecord(dto: CreateMedicalRecordDto, userId?: number): Promise<{ message: string; data: MedicalRecord }> {
        try {
            const recordData: Partial<MedicalRecord> = {
                mr_summary: dto.mr_summary,
                mr_origin_area: dto.mr_origin_area,
                mr_record_date: dto.mr_record_date ? new Date(dto.mr_record_date) : new Date(),
                mr_diagnosis: dto.mr_diagnosis ?? null,
                mr_treatment: dto.mr_treatment ?? null,
                mr_observations: dto.mr_observations ?? null,
                mr_signed_by: dto.mr_signed_by ?? null,
                id_older_adult: { id: dto.id_older_adult } as OlderAdult,
                id_appointment: dto.id_appointment ? { id: dto.id_appointment } as SpecializedAppointment : null,
                id_staff: userId ? { id: userId } as User : null,
            };

            const record = this.medicalRecordRepository.create(recordData);
            const saved = await this.medicalRecordRepository.save(record);
            const full = await this.medicalRecordRepository.findOne({
                where: { id: saved.id },
                relations: ['id_older_adult', 'id_appointment', 'id_staff']
            });
            return { message: 'Medical record created successfully', data: full };
        } catch (error) { throw error; }
    }

    async getMedicalRecords(patientId?: number): Promise<{ message: string; data: MedicalRecord[] }> {
        try {
            const query = this.medicalRecordRepository
                .createQueryBuilder('record')
                .leftJoinAndSelect('record.id_older_adult', 'patient')
                .leftJoinAndSelect('record.id_staff', 'staff')
                .orderBy('record.mr_record_date', 'DESC');

            if (patientId) {
                query.andWhere('patient.id = :patientId', { patientId });
            }

            const records = await query.getMany();
            return { message: 'Medical records retrieved successfully', data: records };
        } catch (error) { throw error; }
    }

    async getMedicalRecordById(id: number): Promise<{ message: string; data: MedicalRecord }> {
        try {
            const record = await this.medicalRecordRepository.findOne({
                where: { id },
                relations: ['id_older_adult', 'id_appointment', 'id_staff']
            });
            if (!record) throw new NotFoundException('Medical record not found');
            return { message: 'Medical record retrieved successfully', data: record };
        } catch (error) { throw error; }
    }

    async updateMedicalRecord(id: number, dto: UpdateMedicalRecordDto): Promise<{ message: string; data: MedicalRecord }> {
        try {
            const record = await this.medicalRecordRepository.findOne({ where: { id } });
            if (!record) throw new NotFoundException('Medical record not found');

            const updateData: Partial<MedicalRecord> = {};
            if (dto.mr_summary !== undefined) updateData.mr_summary = dto.mr_summary;
            if (dto.mr_origin_area !== undefined) updateData.mr_origin_area = dto.mr_origin_area;
            if (dto.mr_record_date !== undefined) updateData.mr_record_date = new Date(dto.mr_record_date);
            if (dto.mr_diagnosis !== undefined) updateData.mr_diagnosis = dto.mr_diagnosis ?? null;
            if (dto.mr_treatment !== undefined) updateData.mr_treatment = dto.mr_treatment ?? null;
            if (dto.mr_observations !== undefined) updateData.mr_observations = dto.mr_observations ?? null;
            if (dto.mr_signed_by !== undefined) updateData.mr_signed_by = dto.mr_signed_by ?? null;
            if (dto.id_older_adult !== undefined) updateData.id_older_adult = { id: dto.id_older_adult } as OlderAdult;
            if (dto.id_appointment !== undefined) updateData.id_appointment = dto.id_appointment ? { id: dto.id_appointment } as SpecializedAppointment : null;

            await this.medicalRecordRepository.save({ ...record, ...updateData });
            const updated = await this.medicalRecordRepository.findOne({
                where: { id },
                relations: ['id_older_adult', 'id_appointment', 'id_staff']
            });
            return { message: 'Medical record updated successfully', data: updated };
        } catch (error) { throw error; }
    }

    async deleteMedicalRecord(id: number): Promise<{ message: string }> {
        try {
            const record = await this.medicalRecordRepository.findOne({ where: { id } });
            if (!record) throw new NotFoundException('Medical record not found');
            await this.medicalRecordRepository.delete(id);
            return { message: 'Medical record deleted successfully' };
        } catch (error) { throw error; }
    }
}
