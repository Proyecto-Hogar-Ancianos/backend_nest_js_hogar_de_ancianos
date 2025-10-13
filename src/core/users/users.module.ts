import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './application/services/users.service';
import { TypeOrmUserRepository } from './infrastructure/repositories/user.repository';
import { User } from './domain/entities/user.entity';
import { UsersController } from './infrastructure/controllers/users.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    AuthModule
  ],
  controllers: [UsersController],
  providers: [
    UsersService,
    TypeOrmUserRepository
  ],
  exports: [UsersService, TypeOrmUserRepository],
})
export class UsersModule { }
