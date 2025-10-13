import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpecializedArea } from './domain/entities/specialized-area.entity';
import { SpecializedAppointment } from './domain/entities/specialized-appointment.entity';
import { NursingRecord } from './domain/entities/nursing-record.entity';
import { PhysiotherapySession } from './domain/entities/physiotherapy-session.entity';
import { PsychologySession } from './domain/entities/psychology-session.entity';
import { SocialWorkReport } from './domain/entities/social-work-report.entity';
import { TypeOrmSpecializedAreaRepository } from './infrastructure/repositories/specialized-area.repository';
import { TypeOrmSpecializedAppointmentRepository } from './infrastructure/repositories/specialized-appointment.repository';
import { TypeOrmNursingRecordRepository } from './infrastructure/repositories/nursing-record.repository';
import { TypeOrmPhysiotherapySessionRepository } from './infrastructure/repositories/physiotherapy-session.repository';
import { TypeOrmPsychologySessionRepository } from './infrastructure/repositories/psychology-session.repository';
import { TypeOrmSocialWorkReportRepository } from './infrastructure/repositories/social-work-report.repository';

// Controllers


import { PsychologySessionController } from './application/controllers/psychology-session.controller';


// Application services
import { SpecializedAreaService } from './application/services/specialized-area.service';

import { NursingRecordService } from './application/services/nursing-record.service';

import { PsychologySessionService } from './application/services/psychology-session.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SpecializedArea,
      SpecializedAppointment,
      NursingRecord,
      PhysiotherapySession,
      PsychologySession,
      SocialWorkReport,
    ]),
  ],
  controllers: [

    PsychologySessionController

  ],
  providers: [
    // application services
    SpecializedAreaService,

    NursingRecordService,

    PsychologySessionService,

    // repositories
    TypeOrmSpecializedAreaRepository,
    TypeOrmSpecializedAppointmentRepository,
    TypeOrmNursingRecordRepository,
    TypeOrmPhysiotherapySessionRepository,
    TypeOrmPsychologySessionRepository,
    TypeOrmSocialWorkReportRepository,
  ],
  exports: [
    TypeOrmSpecializedAreaRepository,
    TypeOrmSpecializedAppointmentRepository,
    TypeOrmNursingRecordRepository,
    TypeOrmPhysiotherapySessionRepository,
    TypeOrmPsychologySessionRepository,
    TypeOrmSocialWorkReportRepository,
  ],
})
export class SpecializedAreasModule { }
