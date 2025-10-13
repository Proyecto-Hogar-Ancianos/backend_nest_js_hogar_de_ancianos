import { PsychologySession } from '../entities/psychology-session.entity';

export interface PsychologySessionRepository {
  findAll(): Promise<PsychologySession[]>;
  findById(id: number): Promise<PsychologySession | null>;
  findByOlderAdult(olderAdultId: number): Promise<PsychologySession[]>;
  findByPsychologist(psychologistId: number): Promise<PsychologySession[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<PsychologySession[]>;
  create(session: Partial<PsychologySession>): Promise<PsychologySession>;
  update(id: number, session: Partial<PsychologySession>): Promise<PsychologySession>;
  delete(id: number): Promise<void>;
}