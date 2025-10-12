import { Injectable } from '@nestjs/common';
import { ProgramRepository } from '../../infrastructure/repositories/program.repository';
import { ProgramParticipant } from '../../domain/entities/program-participant.entity';

@Injectable()
export class ProgramsService {
  constructor(private readonly repo: ProgramRepository) {}

  findAll() {
    return this.repo.findAll();
  }

  findById(id: number) {
    return this.repo.findById(id);
  }

  create(data: any) {
    return this.repo.create(data);
  }

  update(id: number, data: any) {
    return this.repo.update(id, data);
  }

  delete(id: number) {
    return this.repo.delete(id);
  }

  async addParticipant(id: number, dto: Partial<ProgramParticipant>) {
    const program = await this.repo.findById(id);
    if (!program) return null;
    
    const participant = (program.participants || []) as any;
    participant.push(dto as any);

    return dto;
  }
}
