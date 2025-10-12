import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from '../../domain/entities/role.entity';

@Injectable()
export class RoleRepository {
	constructor(
		@InjectRepository(Role)
		private readonly repo: Repository<Role>,
	) {}

	findAll(): Promise<Role[]> {
		return this.repo.find();
	}

	findById(id: number): Promise<Role | null> {
		return this.repo.findOne({ where: { id } });
	}
}

