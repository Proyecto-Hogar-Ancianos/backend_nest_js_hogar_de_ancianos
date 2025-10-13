import { ClinicalHistory } from '../entities/clinical-history.entity';
import { ClinicalCondition } from '../entities/clinical-condition.entity';
import { Vaccine } from '../entities/vaccine.entity';

export interface ClinicalHistoryRepository {
  findAll(): Promise<ClinicalHistory[]>;
  findById(id: number): Promise<ClinicalHistory | null>;
  create(history: Partial<ClinicalHistory>): Promise<ClinicalHistory>;
  update(id: number, history: Partial<ClinicalHistory>): Promise<ClinicalHistory>;
  delete(id: number): Promise<void>;
  addCondition(historyId: number, conditionId: number): Promise<void>;
  removeCondition(historyId: number, conditionId: number): Promise<void>;
  addVaccine(historyId: number, vaccineId: number): Promise<void>;
  removeVaccine(historyId: number, vaccineId: number): Promise<void>;
  getConditions(historyId: number): Promise<ClinicalCondition[]>;
  getVaccines(historyId: number): Promise<Vaccine[]>;
}