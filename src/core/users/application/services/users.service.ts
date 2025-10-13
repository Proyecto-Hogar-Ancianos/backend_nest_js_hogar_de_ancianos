import { Injectable } from '@nestjs/common';
import { TypeOrmUserRepository } from '../../infrastructure/repositories/user.repository';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UsersService {
	constructor(
		private readonly userRepository: TypeOrmUserRepository
	) { }

	async findAll(): Promise<User[]> {
		return this.userRepository.findAll();
	}

	async findById(id: number): Promise<User | null> {
		return this.userRepository.findById(id);
	}

	async create(data: Partial<User>): Promise<User> {
		return this.userRepository.create(data);
	}

	async update(id: number, data: Partial<User>): Promise<User> {
		return this.userRepository.update(id, data);
	}

	async delete(id: number): Promise<void> {
		return this.userRepository.delete(id);
	}
}
