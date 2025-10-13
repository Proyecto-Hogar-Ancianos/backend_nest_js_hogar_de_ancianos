import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EmergencyContact } from '../../domain/entities/emergency-contact.entity';
import { EmergencyContactRepository } from '../../domain/repositories/emergency-contact.repository.interface';

@Injectable()
export class TypeOrmEmergencyContactRepository implements EmergencyContactRepository {
  constructor(
    @InjectRepository(EmergencyContact)
    private readonly repository: Repository<EmergencyContact>
  ) {}

  async findAll(): Promise<EmergencyContact[]> {
    return this.repository.find({
      relations: ['olderAdult']
    });
  }

  async findById(id: number): Promise<EmergencyContact | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['olderAdult']
    });
  }

  async findByOlderAdult(olderAdultId: number): Promise<EmergencyContact[]> {
    return this.repository.find({
      where: { olderAdult: { id: olderAdultId } },
      relations: ['olderAdult']
    });
  }

  async create(emergencyContact: Partial<EmergencyContact>): Promise<EmergencyContact> {
    const newContact = this.repository.create(emergencyContact);
    return this.repository.save(newContact);
  }

  async update(id: number, emergencyContact: Partial<EmergencyContact>): Promise<EmergencyContact> {
    await this.repository.update(id, emergencyContact);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}