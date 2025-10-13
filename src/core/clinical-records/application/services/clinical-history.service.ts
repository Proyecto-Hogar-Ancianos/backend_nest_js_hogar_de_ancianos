import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmClinicalHistoryRepository } from '../../infrastructure/repositories/clinical-history.repository';
import { ClinicalHistory } from '../../domain/entities/clinical-history.entity';
import { ClinicalCondition } from '../../domain/entities/clinical-condition.entity';
import { Vaccine } from '../../domain/entities/vaccine.entity';

@Injectable()
export class ClinicalHistoryService {
  constructor(
    private readonly clinicalHistoryRepository: TypeOrmClinicalHistoryRepository
  ) {}

  async findAll(): Promise<ClinicalHistory[]> {
    return this.clinicalHistoryRepository.findAll();
  }

  async findById(id: number): Promise<ClinicalHistory> {
    const history = await this.clinicalHistoryRepository.findById(id);
    if (!history) {
      throw new NotFoundException(`Clinical history with ID ${id} not found`);
    }
    return history;
  }

  async create(history: Partial<ClinicalHistory>): Promise<ClinicalHistory> {
    return this.clinicalHistoryRepository.create(history);
  }

  async update(id: number, history: Partial<ClinicalHistory>): Promise<ClinicalHistory> {
    await this.findById(id); // Validate existence
    return this.clinicalHistoryRepository.update(id, history);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id); // Validate existence
    return this.clinicalHistoryRepository.delete(id);
  }

  async addCondition(historyId: number, conditionId: number): Promise<void> {
    await this.findById(historyId); // Validate existence
    return this.clinicalHistoryRepository.addCondition(historyId, conditionId);
  }

  async removeCondition(historyId: number, conditionId: number): Promise<void> {
    await this.findById(historyId); // Validate existence
    return this.clinicalHistoryRepository.removeCondition(historyId, conditionId);
  }

  async addVaccine(historyId: number, vaccineId: number): Promise<void> {
    await this.findById(historyId); // Validate existence
    return this.clinicalHistoryRepository.addVaccine(historyId, vaccineId);
  }

  async removeVaccine(historyId: number, vaccineId: number): Promise<void> {
    await this.findById(historyId); // Validate existence
    return this.clinicalHistoryRepository.removeVaccine(historyId, vaccineId);
  }

  async getConditions(historyId: number): Promise<ClinicalCondition[]> {
    await this.findById(historyId); // Validate existence
    return this.clinicalHistoryRepository.getConditions(historyId);
  }

  async getVaccines(historyId: number): Promise<Vaccine[]> {
    await this.findById(historyId); // Validate existence
    return this.clinicalHistoryRepository.getVaccines(historyId);
  }
}
