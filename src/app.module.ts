import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

// Shared Modules
import { DatabaseModule } from './shared/database/database.module';
import { HealthController } from './shared/health/health.controller';

// Core Modules
import { AuthModule } from './core/auth/auth.module';
import { UsersModule } from './core/users/users.module';
import { RolesModule } from './core/roles/roles.module';
import { ProgramsModule } from './core/programs/programs.module';
import { OlderAdultsModule } from './core/older-adults/older-adults.module';
import { ClinicalRecordsModule } from './core/clinical-records/clinical-records.module';

// Guards
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

// Entities for Guard
import { UserSession } from './core/auth/domain/entities/user-session.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
    RolesModule,
    ProgramsModule,
    OlderAdultsModule,
    ClinicalRecordsModule,
  ],
  controllers: [HealthController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule { }
