import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpecializedArea } from '../../domain/entities/specialized-area.entity';
import { SpecializedAreaRepository } from '../../domain/repositories/specialized-area.repository.interface';

@Injectable()
export class TypeOrmSpecializedAreaRepository implements SpecializedAreaRepository {
  constructor(
    @InjectRepository(SpecializedArea)
    private readonly repository: Repository<SpecializedArea>,
  ) {}

  async findAll(): Promise<SpecializedArea[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<SpecializedArea | null> {
    return this.repository.findOne({ where: { id } });
  }

  async findByName(name: string): Promise<SpecializedArea | null> {
    return this.repository.findOne({ where: { name } });
  }

  async findByManager(managerId: number): Promise<SpecializedArea[]> {
    return this.repository.find({ 
      where: { manager: { id: managerId } },
      relations: ['manager']
    });
  }

  async create(area: Partial<SpecializedArea>): Promise<SpecializedArea> {
    const newArea = this.repository.create(area);
    return this.repository.save(newArea);
  }

  async update(id: number, area: Partial<SpecializedArea>): Promise<SpecializedArea> {
    await this.repository.update(id, area);
    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}