import { Module } from '@nestjs/common';
import { DatabaseModule } from './shared/database/database.module';
import { HealthController } from './shared/health/health.controller';
import { UsersModule } from './core/users/users.module';
import { RolesModule } from './core/roles/roles.module';
import { ProgramsModule } from './core/programs/programs.module';

@Module({
  imports: [
    DatabaseModule,
    UsersModule,
    RolesModule,
    ProgramsModule
  ],
  controllers: [HealthController],
})
export class AppModule {}
