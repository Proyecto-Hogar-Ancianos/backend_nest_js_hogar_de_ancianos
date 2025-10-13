import { Injectable } from '@nestjs/common';
import { TypeOrmSpecializedAreaRepository } from '../../infrastructure/repositories/specialized-area.repository';
import { SpecializedArea } from '../../domain/entities/specialized-area.entity';

@Injectable()
export class SpecializedAreaService {
  constructor(private readonly areaRepository: TypeOrmSpecializedAreaRepository) { }

  async getAll(): Promise<SpecializedArea[]> {
    return this.areaRepository.findAll();
  }

  async getById(id: number): Promise<SpecializedArea | null> {
    return this.areaRepository.findById(id);
  }

  async create(data: Partial<SpecializedArea>): Promise<SpecializedArea> {
    return this.areaRepository.create(data);
  }

  async update(id: number, data: Partial<SpecializedArea>): Promise<SpecializedArea> {
    return this.areaRepository.update(id, data);
  }

  async delete(id: number): Promise<void> {
    return this.areaRepository.delete(id);
  }
}
