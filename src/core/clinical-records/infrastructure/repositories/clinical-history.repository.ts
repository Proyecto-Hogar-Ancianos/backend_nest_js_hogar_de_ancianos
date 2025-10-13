import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClinicalHistory } from '../../domain/entities/clinical-history.entity';
import { ClinicalHistoryRepository } from '../../domain/repositories/clinical-history.repository.interface';
import { ClinicalCondition } from '../../domain/entities/clinical-condition.entity';
import { Vaccine } from '../../domain/entities/vaccine.entity';

@Injectable()
export class TypeOrmClinicalHistoryRepository implements ClinicalHistoryRepository {
  constructor(
    @InjectRepository(ClinicalHistory)
    private readonly repository: Repository<ClinicalHistory>
  ) {}

  async findAll(): Promise<ClinicalHistory[]> {
    return this.repository.find({
      relations: ['conditions', 'vaccines']
    });
  }

  async findById(id: number): Promise<ClinicalHistory | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['conditions', 'vaccines']
    });
  }

  async create(history: Partial<ClinicalHistory>): Promise<ClinicalHistory> {
    const newHistory = this.repository.create(history);
    return this.repository.save(newHistory);
  }

  async update(id: number, history: Partial<ClinicalHistory>): Promise<ClinicalHistory> {
    await this.repository.update(id, history);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  async addCondition(historyId: number, conditionId: number): Promise<void> {
    const history = await this.findById(historyId);
    if (!history) throw new Error('Clinical history not found');
    
    const condition = await this.repository.manager.findOne(ClinicalCondition, { where: { id: conditionId } });
    if (!condition) throw new Error('Clinical condition not found');

    history.conditions = [...(history.conditions || []), condition];
    await this.repository.save(history);
  }

  async removeCondition(historyId: number, conditionId: number): Promise<void> {
    const history = await this.findById(historyId);
    if (!history) throw new Error('Clinical history not found');

    history.conditions = history.conditions.filter(c => c.id !== conditionId);
    await this.repository.save(history);
  }

  async addVaccine(historyId: number, vaccineId: number): Promise<void> {
    const history = await this.findById(historyId);
    if (!history) throw new Error('Clinical history not found');
    
    const vaccine = await this.repository.manager.findOne(Vaccine, { where: { id: vaccineId } });
    if (!vaccine) throw new Error('Vaccine not found');

    history.vaccines = [...(history.vaccines || []), vaccine];
    await this.repository.save(history);
  }

  async removeVaccine(historyId: number, vaccineId: number): Promise<void> {
    const history = await this.findById(historyId);
    if (!history) throw new Error('Clinical history not found');

    history.vaccines = history.vaccines.filter(v => v.id !== vaccineId);
    await this.repository.save(history);
  }

  async getConditions(historyId: number): Promise<ClinicalCondition[]> {
    const history = await this.findById(historyId);
    if (!history) throw new Error('Clinical history not found');
    return history.conditions;
  }

  async getVaccines(historyId: number): Promise<Vaccine[]> {
    const history = await this.findById(historyId);
    if (!history) throw new Error('Clinical history not found');
    return history.vaccines;
  }
}