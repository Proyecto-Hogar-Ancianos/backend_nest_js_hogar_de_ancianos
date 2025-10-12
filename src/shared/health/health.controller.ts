import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

@Controller('health')
export class HealthController {
	constructor(@InjectConnection() private readonly connection: Connection) {}

	@Get('db')
	async checkDatabase() {
		try {
			await this.connection.query('SELECT 1');
			return { status: 'ok', message: 'Database connection successful' };
		} catch (error) {
			return { status: 'error', message: error.message };
		}
	}
}
