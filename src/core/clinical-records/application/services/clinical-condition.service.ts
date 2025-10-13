import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmClinicalConditionRepository } from '../../infrastructure/repositories/clinical-condition.repository';
import { ClinicalCondition } from '../../domain/entities/clinical-condition.entity';

@Injectable()
export class ClinicalConditionService {
  constructor(
    private readonly clinicalConditionRepository: TypeOrmClinicalConditionRepository
  ) {}

  async findAll(): Promise<ClinicalCondition[]> {
    return this.clinicalConditionRepository.findAll();
  }

  async findById(id: number): Promise<ClinicalCondition> {
    const condition = await this.clinicalConditionRepository.findById(id);
    if (!condition) {
      throw new NotFoundException(`Clinical condition with ID ${id} not found`);
    }
    return condition;
  }

  async findByName(name: string): Promise<ClinicalCondition> {
    const condition = await this.clinicalConditionRepository.findByName(name);
    if (!condition) {
      throw new NotFoundException(`Clinical condition with name ${name} not found`);
    }
    return condition;
  }

  async create(condition: Partial<ClinicalCondition>): Promise<ClinicalCondition> {
    return this.clinicalConditionRepository.create(condition);
  }

  async update(id: number, condition: Partial<ClinicalCondition>): Promise<ClinicalCondition> {
    await this.findById(id); // Validate existence
    return this.clinicalConditionRepository.update(id, condition);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id); // Validate existence
    return this.clinicalConditionRepository.delete(id);
  }
}
