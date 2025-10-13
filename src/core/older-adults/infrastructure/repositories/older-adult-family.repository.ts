import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OlderAdultFamily } from '../../domain/entities/older-adult-family.entity';
import type { OlderAdultFamilyRepository } from '../../domain/repositories/older-adult-family.repository.interface';

@Injectable()
export class TypeOrmOlderAdultFamilyRepository implements OlderAdultFamilyRepository {
  constructor(
    @InjectRepository(OlderAdultFamily)
    private readonly repository: Repository<OlderAdultFamily>
  ) {}

  async findAll(): Promise<OlderAdultFamily[]> {
    return this.repository.find({
      relations: ['olderAdults']
    });
  }

  async findById(id: number): Promise<OlderAdultFamily | null> {
    return this.repository.findOne({
      where: { id },
      relations: ['olderAdults']
    });
  }

  async findByIdentification(identification: string): Promise<OlderAdultFamily | null> {
    return this.repository.findOne({
      where: { identification },
      relations: ['olderAdults']
    });
  }

  async findByEmail(email: string): Promise<OlderAdultFamily | null> {
    return this.repository.findOne({
      where: { email },
      relations: ['olderAdults']
    });
  }

  async create(olderAdultFamily: Partial<OlderAdultFamily>): Promise<OlderAdultFamily> {
    const newFamily = this.repository.create(olderAdultFamily);
    return this.repository.save(newFamily);
  }

  async update(id: number, olderAdultFamily: Partial<OlderAdultFamily>): Promise<OlderAdultFamily> {
    await this.repository.update(id, olderAdultFamily);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}