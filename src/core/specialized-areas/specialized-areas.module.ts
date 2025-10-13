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
import { SpecializedAreaController } from './infrastructure/controllers/specialized-area.controller';
import { SpecializedAppointmentController } from './infrastructure/controllers/specialized-appointment.controller';
import { NursingRecordController } from './infrastructure/controllers/nursing-record.controller';
import { PhysiotherapySessionController } from './infrastructure/controllers/physiotherapy-session.controller';
import { PsychologySessionController } from './infrastructure/controllers/psychology-session.controller';
import { SocialWorkReportController } from './infrastructure/controllers/social-work-report.controller';

// Application services
import { SpecializedAreaService } from './application/services/specialized-area.service';
import { SpecializedAppointmentService } from './application/services/specialized-appointment.service';
import { NursingRecordService } from './application/services/nursing-record.service';
import { PhysiotherapySessionService } from './application/services/physiotherapy-session.service';
import { PsychologySessionService } from './application/services/psychology-session.service';
import { SocialWorkReportService } from './application/services/social-work-report.service';

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
    SpecializedAreaController,
    SpecializedAppointmentController,
    NursingRecordController,
    PhysiotherapySessionController,
    PsychologySessionController,
    SocialWorkReportController,
  ],
  providers: [
    // application services
    SpecializedAreaService,
    SpecializedAppointmentService,
    NursingRecordService,
    PhysiotherapySessionService,
    PsychologySessionService,
    SocialWorkReportService,
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
export class SpecializedAreasModule {}
