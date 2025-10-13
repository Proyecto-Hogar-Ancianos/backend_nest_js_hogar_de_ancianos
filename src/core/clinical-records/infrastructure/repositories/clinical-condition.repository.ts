import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicalCondition } from '../../domain/entities/clinical-condition.entity';
import { ClinicalConditionRepository } from '../../domain/repositories/clinical-condition.repository.interface';

@Injectable()
export class TypeOrmClinicalConditionRepository implements ClinicalConditionRepository {
  constructor(
    @InjectRepository(ClinicalCondition)
    private readonly repository: Repository<ClinicalCondition>
  ) {}

  async findAll(): Promise<ClinicalCondition[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<ClinicalCondition | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<ClinicalCondition | null> {
    return this.repository.findOne({ where: { name } });
  }

  async create(condition: Partial<ClinicalCondition>): Promise<ClinicalCondition> {
    const newCondition = this.repository.create(condition);
    return this.repository.save(newCondition);
  }

  async update(id: number, condition: Partial<ClinicalCondition>): Promise<ClinicalCondition> {
    await this.repository.update(id, condition);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}