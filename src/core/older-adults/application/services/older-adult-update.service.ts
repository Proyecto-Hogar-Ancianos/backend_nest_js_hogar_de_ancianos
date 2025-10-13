import { Injectable } from '@nestjs/common';
import { TypeOrmOlderAdultUpdateRepository } from '../../infrastructure/repositories/older-adult-update.repository';
import { OlderAdultUpdate } from '../../domain/entities/older-adult-update.entity';

@Injectable()
export class OlderAdultUpdateService {
  constructor(
    private readonly olderAdultUpdateRepository: TypeOrmOlderAdultUpdateRepository
  ) {}

  async findAll(): Promise<OlderAdultUpdate[]> {
    return this.olderAdultUpdateRepository.findAll();
  }

  async findByOlderAdult(olderAdultId: number): Promise<OlderAdultUpdate[]> {
    return this.olderAdultUpdateRepository.findByOlderAdult(olderAdultId);
  }

  async create(update: Partial<OlderAdultUpdate>): Promise<OlderAdultUpdate> {
    return this.olderAdultUpdateRepository.create(update);
  }
}
