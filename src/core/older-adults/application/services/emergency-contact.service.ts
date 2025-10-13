import { Injectable, NotFoundException } from '@nestjs/common';
import { EmergencyContactRepository } from '../../domain/repositories/emergency-contact.repository.interface';
import { EmergencyContact } from '../../domain/entities/emergency-contact.entity';

@Injectable()
export class EmergencyContactService {
  constructor(
    private readonly emergencyContactRepository: EmergencyContactRepository
  ) {}

  async findAll(): Promise<EmergencyContact[]> {
    return this.emergencyContactRepository.findAll();
  }

  async findById(id: number): Promise<EmergencyContact> {
    const contact = await this.emergencyContactRepository.findById(id);
    if (!contact) {
      throw new NotFoundException(`Emergency contact with ID ${id} not found`);
    }
    return contact;
  }

  async findByOlderAdult(olderAdultId: number): Promise<EmergencyContact[]> {
    return this.emergencyContactRepository.findByOlderAdult(olderAdultId);
  }

  async create(contact: Partial<EmergencyContact>): Promise<EmergencyContact> {
    return this.emergencyContactRepository.create(contact);
  }

  async update(id: number, contact: Partial<EmergencyContact>): Promise<EmergencyContact> {
    await this.findById(id); // Validate existence
    return this.emergencyContactRepository.update(id, contact);
  }

  async delete(id: number): Promise<void> {
    await this.findById(id); // Validate existence
    return this.emergencyContactRepository.delete(id);
  }
}