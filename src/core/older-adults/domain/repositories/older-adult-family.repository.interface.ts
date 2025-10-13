import { OlderAdultFamily } from '../entities/older-adult-family.entity';

export interface OlderAdultFamilyRepository {
  findAll(): Promise<OlderAdultFamily[]>;
  findById(id: number): Promise<OlderAdultFamily | null>;
  findByIdentification(identification: string): Promise<OlderAdultFamily | null>;
  findByEmail(email: string): Promise<OlderAdultFamily | null>;
  create(olderAdultFamily: Partial<OlderAdultFamily>): Promise<OlderAdultFamily>;
  update(id: number, olderAdultFamily: Partial<OlderAdultFamily>): Promise<OlderAdultFamily>;
  delete(id: number): Promise<void>;
}