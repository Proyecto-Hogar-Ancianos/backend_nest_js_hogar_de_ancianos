import { ClinicalMedication } from '../entities/clinical-medication.entity';

export interface ClinicalMedicationRepository {
  findAll(): Promise<ClinicalMedication[]>;
  findById(id: number): Promise<ClinicalMedication | null>;
  findByClinicalHistory(clinicalHistoryId: number): Promise<ClinicalMedication[]>;
  create(medication: Partial<ClinicalMedication>): Promise<ClinicalMedication>;
  update(id: number, medication: Partial<ClinicalMedication>): Promise<ClinicalMedication>;
  delete(id: number): Promise<void>;
}