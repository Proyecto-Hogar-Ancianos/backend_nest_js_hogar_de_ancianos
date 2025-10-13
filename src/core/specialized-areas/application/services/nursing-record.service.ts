import { Injectable } from '@nestjs/common';
import { TypeOrmNursingRecordRepository } from '../../infrastructure/repositories/nursing-record.repository';
import { NursingRecord } from '../../domain/entities/nursing-record.entity';

@Injectable()
export class NursingRecordService {
  constructor(private readonly nursingRecordRepository: TypeOrmNursingRecordRepository) {}

  async getAll(): Promise<NursingRecord[]> {
    return this.nursingRecordRepository.findAll();
  }

  async getById(id: number): Promise<NursingRecord | null> {
    return this.nursingRecordRepository.findById(id);
  }

  async create(data: Partial<NursingRecord>): Promise<NursingRecord> {
    return this.nursingRecordRepository.create(data);
  }

  async update(id: number, data: Partial<NursingRecord>): Promise<NursingRecord> {
    return this.nursingRecordRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.nursingRecordRepository.delete(id);
  }
}
