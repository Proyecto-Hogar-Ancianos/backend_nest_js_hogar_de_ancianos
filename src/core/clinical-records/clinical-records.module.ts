import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { ClinicalCondition } from './domain/entities/clinical-condition.entity';
import { Vaccine } from './domain/entities/vaccine.entity';
import { ClinicalHistory } from './domain/entities/clinical-history.entity';
import { ClinicalMedication } from './domain/entities/clinical-medication.entity';

// Controllers
import { ClinicalConditionController } from './application/controllers/clinical-condition.controller';
import { VaccineController } from './application/controllers/vaccine.controller';
import { ClinicalHistoryController } from './application/controllers/clinical-history.controller';
import { ClinicalMedicationController } from './application/controllers/clinical-medication.controller';

// Services
import { ClinicalConditionService } from './application/services/clinical-condition.service';
import { VaccineService } from './application/services/vaccine.service';
import { ClinicalHistoryService } from './application/services/clinical-history.service';
import { ClinicalMedicationService } from './application/services/clinical-medication.service';

// Repositories
import { TypeOrmClinicalConditionRepository } from './infrastructure/repositories/clinical-condition.repository';
import { TypeOrmVaccineRepository } from './infrastructure/repositories/vaccine.repository';
import { TypeOrmClinicalHistoryRepository } from './infrastructure/repositories/clinical-history.repository';
import { TypeOrmClinicalMedicationRepository } from './infrastructure/repositories/clinical-medication.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ClinicalCondition,
      Vaccine,
      ClinicalHistory,
      ClinicalMedication
    ])
  ],
  controllers: [
    ClinicalConditionController,
    VaccineController,
    ClinicalHistoryController,
    ClinicalMedicationController
  ],
  providers: [
    // Services
    ClinicalConditionService,
    VaccineService,
    ClinicalHistoryService,
    ClinicalMedicationService,
    
    // Repositories
    TypeOrmClinicalConditionRepository,
    TypeOrmVaccineRepository,
    TypeOrmClinicalHistoryRepository,
    TypeOrmClinicalMedicationRepository
  ],
  exports: [
    ClinicalConditionService,
    VaccineService,
    ClinicalHistoryService,
    ClinicalMedicationService,
    TypeOrmClinicalConditionRepository,
    TypeOrmVaccineRepository,
    TypeOrmClinicalHistoryRepository,
    TypeOrmClinicalMedicationRepository
  ]
})
export class ClinicalRecordsModule {}
