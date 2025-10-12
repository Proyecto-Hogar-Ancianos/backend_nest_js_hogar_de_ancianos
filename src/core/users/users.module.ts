import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './application/services/users.service';
import { TypeOrmUserRepository } from './infrastructure/repositories/user.repository';
import { User } from './domain/entities/user.entity';
import { UsersController } from './infrastructure/controllers/users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    UsersService,
    { provide: 'UserRepository', useClass: TypeOrmUserRepository }
  ],
  exports: [UsersService],
})
export class UsersModule {}