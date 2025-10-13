import { Injectable, NotFoundException } from '@nestjs/common';
import { OlderAdultRepository } from '../../domain/repositories/older-adult.repository.interface';
import { OlderAdult } from '../../domain/entities/older-adult.entity';

@Injectable()
export class OlderAdultService {
  constructor(
    private readonly olderAdultRepository: OlderAdultRepository
  ) {}

  async findAll(): Promise<OlderAdult[]> {
    return this.olderAdultRepository.findAll();
  }

  async findById(id: number): Promise<OlderAdult> {
    const olderAdult = await this.olderAdultRepository.findById(id);
    if (!olderAdult) {
      throw new NotFoundException(`Older adult with ID ${id} not found`);
    }
    return olderAdult;
  }

  async findByIdentification(identification: string): Promise<OlderAdult> {
    const olderAdult = await this.olderAdultRepository.findByIdentification(identification);
    if (!olderAdult) {
      throw new NotFoundException(`Older adult with identification ${identification} not found`);
    }
    return olderAdult;
  }

  async create(olderAdult: Partial<OlderAdult>): Promise<OlderAdult> {
    return this.olderAdultRepository.create(olderAdult);
  }

  async update(id: number, olderAdult: Partial<OlderAdult>): Promise<OlderAdult> {
    await this.findById(id); // Validate existence
    return this.olderAdultRepository.update(id, olderAdult);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id); // Validate existence
    return this.olderAdultRepository.delete(id);
  }
}