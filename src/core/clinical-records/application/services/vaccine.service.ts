import { Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmVaccineRepository } from '../../infrastructure/repositories/vaccine.repository';
import { Vaccine } from '../../domain/entities/vaccine.entity';

@Injectable()
export class VaccineService {
  constructor(
    private readonly vaccineRepository: TypeOrmVaccineRepository
  ) {}

  async findAll(): Promise<Vaccine[]> {
    return this.vaccineRepository.findAll();
  }

  async findById(id: number): Promise<Vaccine> {
    const vaccine = await this.vaccineRepository.findById(id);
    if (!vaccine) {
      throw new NotFoundException(`Vaccine with ID ${id} not found`);
    }
    return vaccine;
  }

  async findByName(name: string): Promise<Vaccine> {
    const vaccine = await this.vaccineRepository.findByName(name);
    if (!vaccine) {
      throw new NotFoundException(`Vaccine with name ${name} not found`);
    }
    return vaccine;
  }

  async create(vaccine: Partial<Vaccine>): Promise<Vaccine> {
    return this.vaccineRepository.create(vaccine);
  }

  async update(id: number, vaccine: Partial<Vaccine>): Promise<Vaccine> {
    await this.findById(id); // Validate existence
    return this.vaccineRepository.update(id, vaccine);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id); // Validate existence
    return this.vaccineRepository.delete(id);
  }
}
