import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleChange } from '../../domain/entities/role-change.entity';

@Injectable()
export class RoleChangeRepository {
  constructor(
    @InjectRepository(RoleChange)
    private readonly repo: Repository<RoleChange>,
  ) {}

  create(change: Partial<RoleChange>): Promise<RoleChange> {
    const c = this.repo.create(change);
    return this.repo.save(c);
  }

  findAll(): Promise<RoleChange[]> {
    return this.repo.find();
  }
}
