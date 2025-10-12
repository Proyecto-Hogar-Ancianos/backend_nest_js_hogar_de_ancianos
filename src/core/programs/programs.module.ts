import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramsController } from './infrastructure/controllers/programs.controller';
import { Program } from './domain/entities/program.entity';
import { ProgramParticipant } from './domain/entities/program-participant.entity';
import { ProgramRepository } from './infrastructure/repositories/program.repository';
import { ProgramsService } from './application/services/programs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Program, ProgramParticipant])],
  controllers: [ProgramsController],
  providers: [ProgramRepository, ProgramsService, { provide: 'ProgramService', useExisting: ProgramsService }],
  exports: [ProgramsService, ProgramRepository],
})
export class ProgramsModule {}
