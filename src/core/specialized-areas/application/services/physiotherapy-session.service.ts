import { Injectable } from '@nestjs/common';
import { TypeOrmPhysiotherapySessionRepository } from '../../infrastructure/repositories/physiotherapy-session.repository';
import { PhysiotherapySession } from '../../domain/entities/physiotherapy-session.entity';

@Injectable()
export class PhysiotherapySessionService {
  constructor(private readonly physiotherapyRepository: TypeOrmPhysiotherapySessionRepository) {}

  async getAll(): Promise<PhysiotherapySession[]> {
    return this.physiotherapyRepository.findAll();
  }

  async getById(id: number): Promise<PhysiotherapySession | null> {
    return this.physiotherapyRepository.findById(id);
  }

  async create(data: Partial<PhysiotherapySession>): Promise<PhysiotherapySession> {
    return this.physiotherapyRepository.create(data);
  }

  async update(id: number, data: Partial<PhysiotherapySession>): Promise<PhysiotherapySession> {
    return this.physiotherapyRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.physiotherapyRepository.delete(id);
  }
}
