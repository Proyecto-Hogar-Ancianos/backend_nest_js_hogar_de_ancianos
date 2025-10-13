import { OlderAdult } from '../entities/older-adult.entity';

export interface OlderAdultRepository {
  findAll(): Promise<OlderAdult[]>;
  findById(id: number): Promise<OlderAdult | null>;
  findByIdentification(identification: string): Promise<OlderAdult | null>;
  create(olderAdult: Partial<OlderAdult>): Promise<OlderAdult>;
  update(id: number, olderAdult: Partial<OlderAdult>): Promise<OlderAdult>;
  delete(id: number): Promise<void>;
}
