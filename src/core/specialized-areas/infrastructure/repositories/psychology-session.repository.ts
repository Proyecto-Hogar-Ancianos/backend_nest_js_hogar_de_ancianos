import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { PsychologySession } from '../../domain/entities/psychology-session.entity';
import { PsychologySessionRepository } from '../../domain/repositories/psychology-session.repository.interface';

@Injectable()
export class TypeOrmPsychologySessionRepository implements PsychologySessionRepository {
  constructor(
    @InjectRepository(PsychologySession)
    private readonly repository: Repository<PsychologySession>,
  ) {}

  async findAll(): Promise<PsychologySession[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<PsychologySession | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByOlderAdult(olderAdultId: number): Promise<PsychologySession[]> {
    return this.repository.find({ 
      where: { appointment: { patient: { id: olderAdultId } } },
      relations: ['appointment', 'appointment.patient']
    });
  }

  async findByPsychologist(psychologistId: number): Promise<PsychologySession[]> {
    return this.repository.find({ 
      where: { appointment: { staff: { id: psychologistId } } },
      relations: ['appointment', 'appointment.staff']
    });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<PsychologySession[]> {
    return this.repository.find({
      where: {
        date: Between(startDate, endDate),
      },
    });
  }

  async create(session: Partial<PsychologySession>): Promise<PsychologySession> {
    const newSession = this.repository.create(session);
    return this.repository.save(newSession);
  }

  async update(id: number, session: Partial<PsychologySession>): Promise<PsychologySession> {
    await this.repository.update(id, session);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}