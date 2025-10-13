import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { SocialWorkReport } from '../../domain/entities/social-work-report.entity';
import { SocialWorkReportRepository } from '../../domain/repositories/social-work-report.repository.interface';

@Injectable()
export class TypeOrmSocialWorkReportRepository implements SocialWorkReportRepository {
  constructor(
    @InjectRepository(SocialWorkReport)
    private readonly repository: Repository<SocialWorkReport>,
  ) {}

  async findAll(): Promise<SocialWorkReport[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<SocialWorkReport | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByOlderAdult(olderAdultId: number): Promise<SocialWorkReport[]> {
    return this.repository.find({ 
      where: { appointment: { patient: { id: olderAdultId } } },
      relations: ['appointment', 'appointment.patient']
    });
  }

  async findBySocialWorker(socialWorkerId: number): Promise<SocialWorkReport[]> {
    return this.repository.find({ 
      where: { appointment: { staff: { id: socialWorkerId } } },
      relations: ['appointment', 'appointment.staff']
    });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<SocialWorkReport[]> {
    return this.repository.find({
      where: {
        createdAt: Between(startDate, endDate),
      },
    });
  }

  async create(report: Partial<SocialWorkReport>): Promise<SocialWorkReport> {
    const newReport = this.repository.create(report);
    return this.repository.save(newReport);
  }

  async update(id: number, report: Partial<SocialWorkReport>): Promise<SocialWorkReport> {
    await this.repository.update(id, report);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}