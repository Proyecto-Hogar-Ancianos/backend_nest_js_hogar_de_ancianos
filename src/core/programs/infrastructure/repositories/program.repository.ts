import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Program } from '../../domain/entities/program.entity';

@Injectable()
export class ProgramRepository {
	constructor(
		@InjectRepository(Program)
		private readonly repo: Repository<Program>,
	) {}

	findAll(): Promise<Program[]> {
		return this.repo.find({ relations: ['participants'] });
	}

	findById(id: number): Promise<Program | null> {
		return this.repo.findOne({ where: { id }, relations: ['participants'] });
	}

	create(data: Partial<Program>): Promise<Program> {
		const p = this.repo.create(data);
		return this.repo.save(p);
	}

	async update(id: number, data: Partial<Program>): Promise<Program> {
		await this.repo.update(id, data);
		return this.findById(id);
	}

	async delete(id: number): Promise<void> {
		await this.repo.delete(id);
	}
}

