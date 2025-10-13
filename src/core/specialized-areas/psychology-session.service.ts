import { Injectable } from '@nestjs/common';
import { TypeOrmPsychologySessionRepository } from './infrastructure/repositories/psychology-session.repository';
import { PsychologySession } from './domain/entities/psychology-session.entity';

@Injectable()
export class PsychologySessionService {
  constructor(private readonly psychologySessionRepository: TypeOrmPsychologySessionRepository) {}

  async getAll(): Promise<PsychologySession[]> {
    return this.psychologySessionRepository.findAll();
  }

  async getById(id: number): Promise<PsychologySession | null> {
    return this.psychologySessionRepository.findById(id);
  }

  async create(data: Partial<PsychologySession>): Promise<PsychologySession> {
    return this.psychologySessionRepository.create(data);
  }

  async update(id: number, data: Partial<PsychologySession>): Promise<PsychologySession> {
    return this.psychologySessionRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.psychologySessionRepository.delete(id);
  }
}
