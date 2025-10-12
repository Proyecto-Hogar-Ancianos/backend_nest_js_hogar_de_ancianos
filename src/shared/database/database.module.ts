import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from '../../config/database.config';

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [databaseConfig],
		}),
			TypeOrmModule.forRootAsync({
				imports: [ConfigModule],
				inject: [ConfigService],
				useFactory: (configService: ConfigService) => ({
					type: 'mysql',
					host: configService.get<string>('database.host'),
					port: configService.get<number>('database.port'),
					username: configService.get<string>('database.username'),
					password: configService.get<string>('database.password'),
					database: configService.get<string>('database.database'),
					synchronize: configService.get<boolean>('database.synchronize'),
					logging: configService.get<boolean>('database.logging'),
					autoLoadEntities: true,
				}),
			}),
	],
})
export class DatabaseModule {}
