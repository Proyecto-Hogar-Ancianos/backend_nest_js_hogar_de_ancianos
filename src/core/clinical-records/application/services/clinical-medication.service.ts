import { Injectable, NotFoundException } from '@nestjs/common';
import { ClinicalMedicationRepository } from '../../domain/repositories/clinical-medication.repository.interface';
import { ClinicalMedication } from '../../domain/entities/clinical-medication.entity';

@Injectable()
export class ClinicalMedicationService {
  constructor(
    private readonly clinicalMedicationRepository: ClinicalMedicationRepository
  ) {}

  async findAll(): Promise<ClinicalMedication[]> {
    return this.clinicalMedicationRepository.findAll();
  }

  async findById(id: number): Promise<ClinicalMedication> {
    const medication = await this.clinicalMedicationRepository.findById(id);
    if (!medication) {
      throw new NotFoundException(`Clinical medication with ID ${id} not found`);
    }
    return medication;
  }

  async findByClinicalHistory(clinicalHistoryId: number): Promise<ClinicalMedication[]> {
    return this.clinicalMedicationRepository.findByClinicalHistory(clinicalHistoryId);
  }

  async create(medication: Partial<ClinicalMedication>): Promise<ClinicalMedication> {
    return this.clinicalMedicationRepository.create(medication);
  }

  async update(id: number, medication: Partial<ClinicalMedication>): Promise<ClinicalMedication> {
    await this.findById(id); // Validate existence
    return this.clinicalMedicationRepository.update(id, medication);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id); // Validate existence
    return this.clinicalMedicationRepository.delete(id);
  }
}