import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OlderAdultUpdate } from '../../domain/entities/older-adult-update.entity';
import { OlderAdultUpdateRepository } from '../../domain/repositories/older-adult-update.repository.interface';

@Injectable()
export class TypeOrmOlderAdultUpdateRepository implements OlderAdultUpdateRepository {
  constructor(
    @InjectRepository(OlderAdultUpdate)
    private readonly repository: Repository<OlderAdultUpdate>
  ) {}

  async findAll(): Promise<OlderAdultUpdate[]> {
    return this.repository.find({
      relations: ['olderAdult', 'changedBy']
    });
  }

  async findById(id: number): Promise<OlderAdultUpdate | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['olderAdult', 'changedBy']
    });
  }

  async findByOlderAdult(olderAdultId: number): Promise<OlderAdultUpdate[]> {
    return this.repository.find({
      where: { olderAdult: { id: olderAdultId } },
      relations: ['olderAdult', 'changedBy']
    });
  }

  async create(olderAdultUpdate: Partial<OlderAdultUpdate>): Promise<OlderAdultUpdate> {
    const newUpdate = this.repository.create(olderAdultUpdate);
    return this.repository.save(newUpdate);
  }
}