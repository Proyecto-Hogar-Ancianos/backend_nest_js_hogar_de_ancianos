import { Injectable } from '@nestjs/common';
import { TypeOrmPhysiotherapySessionRepository } from './infrastructure/repositories/physiotherapy-session.repository';
import { PhysiotherapySession } from './domain/entities/physiotherapy-session.entity';

@Injectable()
export class PhysiotherapySessionService {
  constructor(private readonly physiotherapySessionRepository: TypeOrmPhysiotherapySessionRepository) {}

  async getAll(): Promise<PhysiotherapySession[]> {
    return this.physiotherapySessionRepository.findAll();
  }

  async getById(id: number): Promise<PhysiotherapySession | null> {
    return this.physiotherapySessionRepository.findById(id);
  }

  async create(data: Partial<PhysiotherapySession>): Promise<PhysiotherapySession> {
    return this.physiotherapySessionRepository.create(data);
  }

  async update(id: number, data: Partial<PhysiotherapySession>): Promise<PhysiotherapySession> {
    return this.physiotherapySessionRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.physiotherapySessionRepository.delete(id);
  }
}
