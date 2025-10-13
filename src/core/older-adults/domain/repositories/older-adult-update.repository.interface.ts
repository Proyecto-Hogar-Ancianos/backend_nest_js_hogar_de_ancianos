import { OlderAdultUpdate } from '../entities/older-adult-update.entity';

export interface OlderAdultUpdateRepository {
  findAll(): Promise<OlderAdultUpdate[]>;
  findById(id: number): Promise<OlderAdultUpdate | null>;
  findByOlderAdult(olderAdultId: number): Promise<OlderAdultUpdate[]>;
  create(olderAdultUpdate: Partial<OlderAdultUpdate>): Promise<OlderAdultUpdate>;
}