import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository.interface';
import { User } from '../../domain/entities/user.entity';

@Injectable()
export class UsersService {
	constructor(
		@Inject('UserRepository')
		private readonly userRepository: UserRepository
	) {}

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
