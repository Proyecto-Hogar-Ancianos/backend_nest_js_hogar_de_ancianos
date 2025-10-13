import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicalMedication } from '../../domain/entities/clinical-medication.entity';
import { ClinicalMedicationRepository } from '../../domain/repositories/clinical-medication.repository.interface';

@Injectable()
export class TypeOrmClinicalMedicationRepository implements ClinicalMedicationRepository {
  constructor(
    @InjectRepository(ClinicalMedication)
    private readonly repository: Repository<ClinicalMedication>
  ) {}

  async findAll(): Promise<ClinicalMedication[]> {
    return this.repository.find({
      relations: ['clinicalHistory']
    });
  }

  async findById(id: number): Promise<ClinicalMedication | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['clinicalHistory']
    });
  }

  async findByClinicalHistory(clinicalHistoryId: number): Promise<ClinicalMedication[]> {
    return this.repository.find({
      where: { clinicalHistory: { id: clinicalHistoryId } },
      relations: ['clinicalHistory']
    });
  }

  async create(medication: Partial<ClinicalMedication>): Promise<ClinicalMedication> {
    const newMedication = this.repository.create(medication);
    return this.repository.save(newMedication);
  }

  async update(id: number, medication: Partial<ClinicalMedication>): Promise<ClinicalMedication> {
    await this.repository.update(id, medication);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}