import { SocialWorkReport } from '../entities/social-work-report.entity';

export interface SocialWorkReportRepository {
  findAll(): Promise<SocialWorkReport[]>;
  findById(id: number): Promise<SocialWorkReport | null>;
  findByOlderAdult(olderAdultId: number): Promise<SocialWorkReport[]>;
  findBySocialWorker(socialWorkerId: number): Promise<SocialWorkReport[]>;
  findByDateRange(startDate: Date, endDate: Date): Promise<SocialWorkReport[]>;
  create(report: Partial<SocialWorkReport>): Promise<SocialWorkReport>;
  update(id: number, report: Partial<SocialWorkReport>): Promise<SocialWorkReport>;
  delete(id: number): Promise<void>;
}