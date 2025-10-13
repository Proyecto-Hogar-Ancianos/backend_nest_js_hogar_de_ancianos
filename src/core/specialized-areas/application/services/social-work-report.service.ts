import { Injectable } from '@nestjs/common';
import { TypeOrmSocialWorkReportRepository } from '../../infrastructure/repositories/social-work-report.repository';
import { SocialWorkReport } from '../../domain/entities/social-work-report.entity';

@Injectable()
export class SocialWorkReportService {
  constructor(private readonly socialWorkReportRepository: TypeOrmSocialWorkReportRepository) {}

  async getAll(): Promise<SocialWorkReport[]> {
    return this.socialWorkReportRepository.findAll();
  }

  async getById(id: number): Promise<SocialWorkReport | null> {
    return this.socialWorkReportRepository.findById(id);
  }

  async create(data: Partial<SocialWorkReport>): Promise<SocialWorkReport> {
    return this.socialWorkReportRepository.create(data);
  }

  async update(id: number, data: Partial<SocialWorkReport>): Promise<SocialWorkReport> {
    return this.socialWorkReportRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.socialWorkReportRepository.delete(id);
  }
}
