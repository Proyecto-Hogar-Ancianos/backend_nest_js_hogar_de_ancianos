import { Injectable } from '@nestjs/common';
import { TypeOrmSpecializedAppointmentRepository } from '../../infrastructure/repositories/specialized-appointment.repository';
import { SpecializedAppointment } from '../../domain/entities/specialized-appointment.entity';

@Injectable()
export class SpecializedAppointmentService {
  constructor(private readonly appointmentRepository: TypeOrmSpecializedAppointmentRepository) {}

  async getAll(): Promise<SpecializedAppointment[]> {
    return this.appointmentRepository.findAll();
  }

  async getById(id: number): Promise<SpecializedAppointment | null> {
    return this.appointmentRepository.findById(id);
  }

  async create(data: Partial<SpecializedAppointment>): Promise<SpecializedAppointment> {
    return this.appointmentRepository.create(data);
  }

  async update(id: number, data: Partial<SpecializedAppointment>): Promise<SpecializedAppointment> {
    return this.appointmentRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.appointmentRepository.delete(id);
  }
}
