import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OlderAdult } from '../../domain/entities/older-adult.entity';
import { OlderAdultRepository } from '../../domain/repositories/older-adult.repository.interface';

@Injectable()
export class TypeOrmOlderAdultRepository implements OlderAdultRepository {
  constructor(
    @InjectRepository(OlderAdult)
    private readonly repository: Repository<OlderAdult>
  ) {}

  async findAll(): Promise<OlderAdult[]> {
    return this.repository.find({
      relations: ['program', 'family', 'emergencyContacts']
    });
  }

  async findById(id: number): Promise<OlderAdult | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['program', 'family', 'emergencyContacts']
    });
  }

  async findByIdentification(identification: string): Promise<OlderAdult | null> {
    return this.repository.findOne({
      where: { identification },
      relations: ['program', 'family', 'emergencyContacts']
    });
  }

  async create(olderAdult: Partial<OlderAdult>): Promise<OlderAdult> {
    const newOlderAdult = this.repository.create(olderAdult);
    return this.repository.save(newOlderAdult);
  }

  async update(id: number, olderAdult: Partial<OlderAdult>): Promise<OlderAdult> {
    await this.repository.update(id, olderAdult);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
