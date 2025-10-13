import { Injectable, NotFoundException } from '@nestjs/common';
import { OlderAdultFamilyRepository } from '../../domain/repositories/older-adult-family.repository.interface';
import { OlderAdultFamily } from '../../domain/entities/older-adult-family.entity';

@Injectable()
export class OlderAdultFamilyService {
  constructor(
    private readonly olderAdultFamilyRepository: OlderAdultFamilyRepository
  ) {}

  async findAll(): Promise<OlderAdultFamily[]> {
    return this.olderAdultFamilyRepository.findAll();
  }

  async findById(id: number): Promise<OlderAdultFamily> {
    const family = await this.olderAdultFamilyRepository.findById(id);
    if (!family) {
      throw new NotFoundException(`Family member with ID ${id} not found`);
    }
    return family;
  }

  async findByIdentification(identification: string): Promise<OlderAdultFamily> {
    const family = await this.olderAdultFamilyRepository.findByIdentification(identification);
    if (!family) {
      throw new NotFoundException(`Family member with identification ${identification} not found`);
    }
    return family;
  }

  async findByEmail(email: string): Promise<OlderAdultFamily> {
    const family = await this.olderAdultFamilyRepository.findByEmail(email);
    if (!family) {
      throw new NotFoundException(`Family member with email ${email} not found`);
    }
    return family;
  }

  async create(family: Partial<OlderAdultFamily>): Promise<OlderAdultFamily> {
    return this.olderAdultFamilyRepository.create(family);
  }

  async update(id: number, family: Partial<OlderAdultFamily>): Promise<OlderAdultFamily> {
    await this.findById(id); // Validate existence
    return this.olderAdultFamilyRepository.update(id, family);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id); // Validate existence
    return this.olderAdultFamilyRepository.delete(id);
  }
}