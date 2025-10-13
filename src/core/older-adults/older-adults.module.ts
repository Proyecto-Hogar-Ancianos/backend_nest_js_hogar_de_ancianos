import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entities
import { OlderAdult } from './domain/entities/older-adult.entity';
import { OlderAdultFamily } from './domain/entities/older-adult-family.entity';
import { EmergencyContact } from './domain/entities/emergency-contact.entity';
import { OlderAdultUpdate } from './domain/entities/older-adult-update.entity';

// Repositories
import { TypeOrmOlderAdultRepository } from './infrastructure/repositories/older-adult.repository';
import { TypeOrmOlderAdultFamilyRepository } from './infrastructure/repositories/older-adult-family.repository';
import { TypeOrmEmergencyContactRepository } from './infrastructure/repositories/emergency-contact.repository';
import { TypeOrmOlderAdultUpdateRepository } from './infrastructure/repositories/older-adult-update.repository';

// Services
import { OlderAdultService } from './application/services/older-adult.service';
import { OlderAdultFamilyService } from './application/services/older-adult-family.service';
import { EmergencyContactService } from './application/services/emergency-contact.service';
import { OlderAdultUpdateService } from './application/services/older-adult-update.service';

// Controllers
import { OlderAdultController } from './application/controllers/older-adult.controller';
import { OlderAdultFamilyController } from './application/controllers/older-adult-family.controller';
import { EmergencyContactController } from './application/controllers/emergency-contact.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OlderAdult,
      OlderAdultFamily,
      EmergencyContact,
      OlderAdultUpdate
    ])
  ],
  providers: [
    // Services
    OlderAdultService,
    OlderAdultFamilyService,
    EmergencyContactService,
    OlderAdultUpdateService,
    
    // Repositories
    TypeOrmOlderAdultRepository,
    TypeOrmOlderAdultFamilyRepository,
    TypeOrmEmergencyContactRepository,
    TypeOrmOlderAdultUpdateRepository
  ],
  controllers: [
    OlderAdultController,
    OlderAdultFamilyController,
    EmergencyContactController
  ],
  exports: [
    OlderAdultService,
    OlderAdultFamilyService,
    EmergencyContactService,
    OlderAdultUpdateService,
    TypeOrmOlderAdultRepository,
    TypeOrmOlderAdultFamilyRepository,
    TypeOrmEmergencyContactRepository,
    TypeOrmOlderAdultUpdateRepository
  ]
})
export class OlderAdultsModule {}
