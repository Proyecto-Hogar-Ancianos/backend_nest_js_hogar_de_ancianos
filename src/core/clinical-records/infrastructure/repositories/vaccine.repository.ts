import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vaccine } from '../../domain/entities/vaccine.entity';
import { VaccineRepository } from '../../domain/repositories/vaccine.repository.interface';

@Injectable()
export class TypeOrmVaccineRepository implements VaccineRepository {
  constructor(
    @InjectRepository(Vaccine)
    private readonly repository: Repository<Vaccine>
  ) {}

  async findAll(): Promise<Vaccine[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<Vaccine | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<Vaccine | null> {
    return this.repository.findOne({ where: { name } });
  }

  async create(vaccine: Partial<Vaccine>): Promise<Vaccine> {
    const newVaccine = this.repository.create(vaccine);
    return this.repository.save(newVaccine);
  }

  async update(id: number, vaccine: Partial<Vaccine>): Promise<Vaccine> {
    await this.repository.update(id, vaccine);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}