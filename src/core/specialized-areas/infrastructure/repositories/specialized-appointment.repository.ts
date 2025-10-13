import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecializedAppointment } from '../../domain/entities/specialized-appointment.entity';
import { SpecializedAppointmentRepository } from '../../domain/repositories/specialized-appointment.repository.interface';

@Injectable()
export class TypeOrmSpecializedAppointmentRepository implements SpecializedAppointmentRepository {
  constructor(
    @InjectRepository(SpecializedAppointment)
    private readonly repository: Repository<SpecializedAppointment>,
  ) {}

  async findAll(): Promise<SpecializedAppointment[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<SpecializedAppointment | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByArea(areaId: number): Promise<SpecializedAppointment[]> {
    return this.repository.find({ 
      where: { area: { id: areaId } },
      relations: ['area'] 
    });
  }

  async findByOlderAdult(olderAdultId: number): Promise<SpecializedAppointment[]> {
    return this.repository.find({ 
      where: { patient: { id: olderAdultId } },
      relations: ['patient']
    });
  }

  async findBySpecialist(specialistId: number): Promise<SpecializedAppointment[]> {
    return this.repository.find({ 
      where: { staff: { id: specialistId } },
      relations: ['staff']
    });
  }

  async create(appointment: Partial<SpecializedAppointment>): Promise<SpecializedAppointment> {
    const newAppointment = this.repository.create(appointment);
    return this.repository.save(newAppointment);
  }

  async update(id: number, appointment: Partial<SpecializedAppointment>): Promise<SpecializedAppointment> {
    await this.repository.update(id, appointment);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}