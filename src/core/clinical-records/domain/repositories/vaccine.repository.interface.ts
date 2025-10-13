import { Vaccine } from '../entities/vaccine.entity';

export interface VaccineRepository {
  findAll(): Promise<Vaccine[]>;
  findById(id: number): Promise<Vaccine | null>;
  findByName(name: string): Promise<Vaccine | null>;
  create(vaccine: Partial<Vaccine>): Promise<Vaccine>;
  update(id: number, vaccine: Partial<Vaccine>): Promise<Vaccine>;
  delete(id: number): Promise<void>;
}