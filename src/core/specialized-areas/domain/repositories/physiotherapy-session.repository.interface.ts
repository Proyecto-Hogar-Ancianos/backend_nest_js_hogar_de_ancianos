import { PhysiotherapySession } from '../entities/physiotherapy-session.entity';

export interface PhysiotherapySessionRepository {
  findAll(): Promise<PhysiotherapySession[]>;
  findById(id: number): Promise<PhysiotherapySession | null>;
  findByOlderAdult(olderAdultId: number): Promise<PhysiotherapySession[]>;
  findByPhysiotherapist(physiotherapistId: number): Promise<PhysiotherapySession[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<PhysiotherapySession[]>;
  create(session: Partial<PhysiotherapySession>): Promise<PhysiotherapySession>;
  update(id: number, session: Partial<PhysiotherapySession>): Promise<PhysiotherapySession>;
  delete(id: number): Promise<void>;
}