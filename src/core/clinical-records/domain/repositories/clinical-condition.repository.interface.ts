import { ClinicalCondition } from '../entities/clinical-condition.entity';

export interface ClinicalConditionRepository {
  findAll(): Promise<ClinicalCondition[]>;
  findById(id: number): Promise<ClinicalCondition | null>;
  findByName(name: string): Promise<ClinicalCondition | null>;
  create(condition: Partial<ClinicalCondition>): Promise<ClinicalCondition>;
  update(id: number, condition: Partial<ClinicalCondition>): Promise<ClinicalCondition>;
  delete(id: number): Promise<void>;
}