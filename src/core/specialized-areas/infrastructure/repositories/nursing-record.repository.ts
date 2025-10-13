import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { NursingRecord } from '../../domain/entities/nursing-record.entity';
import { NursingRecordRepository } from '../../domain/repositories/nursing-record.repository.interface';

@Injectable()
export class TypeOrmNursingRecordRepository implements NursingRecordRepository {
  constructor(
    @InjectRepository(NursingRecord)
    private readonly repository: Repository<NursingRecord>,
  ) {}

  async findAll(): Promise<NursingRecord[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<NursingRecord | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByOlderAdult(olderAdultId: number): Promise<NursingRecord[]> {
    return this.repository.find({ 
      where: { appointment: { patient: { id: olderAdultId } } },
      relations: ['appointment', 'appointment.patient']
    });
  }

  async findByNurse(nurseId: number): Promise<NursingRecord[]> {
    return this.repository.find({ 
      where: { appointment: { staff: { id: nurseId } } },
      relations: ['appointment', 'appointment.staff']
    });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<NursingRecord[]> {
    return this.repository.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
    });
  }

  async create(record: Partial<NursingRecord>): Promise<NursingRecord> {
    const newRecord = this.repository.create(record);
    return this.repository.save(newRecord);
  }

  async update(id: number, record: Partial<NursingRecord>): Promise<NursingRecord> {
    await this.repository.update(id, record);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}