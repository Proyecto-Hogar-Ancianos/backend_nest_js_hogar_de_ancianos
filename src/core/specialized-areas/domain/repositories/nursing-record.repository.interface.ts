import { NursingRecord } from '../entities/nursing-record.entity';

export interface NursingRecordRepository {
  findAll(): Promise<NursingRecord[]>;
  findById(id: number): Promise<NursingRecord | null>;
  findByOlderAdult(olderAdultId: number): Promise<NursingRecord[]>;
  findByNurse(nurseId: number): Promise<NursingRecord[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<NursingRecord[]>;
  create(record: Partial<NursingRecord>): Promise<NursingRecord>;
  update(id: number, record: Partial<NursingRecord>): Promise<NursingRecord>;
  delete(id: number): Promise<void>;
}