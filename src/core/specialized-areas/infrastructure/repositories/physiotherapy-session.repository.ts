import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { PhysiotherapySession } from '../../domain/entities/physiotherapy-session.entity';
import { PhysiotherapySessionRepository } from '../../domain/repositories/physiotherapy-session.repository.interface';

@Injectable()
export class TypeOrmPhysiotherapySessionRepository implements PhysiotherapySessionRepository {
  constructor(
    @InjectRepository(PhysiotherapySession)
    private readonly repository: Repository<PhysiotherapySession>,
  ) {}

  async findAll(): Promise<PhysiotherapySession[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<PhysiotherapySession | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByOlderAdult(olderAdultId: number): Promise<PhysiotherapySession[]> {
    return this.repository.find({ 
      where: { appointment: { patient: { id: olderAdultId } } },
      relations: ['appointment', 'appointment.patient']
    });
  }

  async findByPhysiotherapist(physiotherapistId: number): Promise<PhysiotherapySession[]> {
    return this.repository.find({ 
      where: { appointment: { staff: { id: physiotherapistId } } },
      relations: ['appointment', 'appointment.staff']
    });
  }

  async findByDateRange(startDate: Date, endDate: Date): Promise<PhysiotherapySession[]> {
    return this.repository.find({
      where: {
        date: Between(startDate, endDate),
      },
    });
  }

  async create(session: Partial<PhysiotherapySession>): Promise<PhysiotherapySession> {
    const newSession = this.repository.create(session);
    return this.repository.save(newSession);
  }

  async update(id: number, session: Partial<PhysiotherapySession>): Promise<PhysiotherapySession> {
    await this.repository.update(id, session);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}