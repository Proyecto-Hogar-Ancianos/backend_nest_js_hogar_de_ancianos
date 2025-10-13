import { SpecializedArea } from '../entities/specialized-area.entity';

export interface SpecializedAreaRepository {
  findAll(): Promise<SpecializedArea[]>;
  findById(id: number): Promise<SpecializedArea | null>;
  findByName(name: string): Promise<SpecializedArea | null>;
  findByManager(managerId: number): Promise<SpecializedArea[]>;
  create(area: Partial<SpecializedArea>): Promise<SpecializedArea>;
  update(id: number, area: Partial<SpecializedArea>): Promise<SpecializedArea>;
  delete(id: number): Promise<void>;
}