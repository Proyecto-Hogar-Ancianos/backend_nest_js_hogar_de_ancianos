import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/database/database.module';
import { HealthController } from './shared/health/health.controller';
import { UsersModule } from './core/users/users.module';
import { RolesModule } from './core/roles/roles.module';
import { ProgramsModule } from './core/programs/programs.module';
import { OlderAdultsModule } from './core/older-adults/older-adults.module';
import { ClinicalRecordsModule } from './core/clinical-records/clinical-records.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    RolesModule,
    ProgramsModule,
    OlderAdultsModule,
    ClinicalRecordsModule
  ],
  controllers: [HealthController],
})
export class AppModule {}
