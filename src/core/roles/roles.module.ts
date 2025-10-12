import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './domain/entities/role.entity';
import { Permission } from './domain/entities/permission.entity';
import { RoleChange } from './domain/entities/role-change.entity';
import { RoleRepository } from './infrastructure/repositories/role.repository';
import { RoleChangeRepository } from './infrastructure/repositories/role-change.repository';
import { RolesController } from './infrastructure/controllers/roles.controller';
import { PermissionsController } from './infrastructure/controllers/permissions.controller';
import { RoleChangesController } from './infrastructure/controllers/role-changes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Role, Permission, RoleChange])],
  controllers: [RolesController, PermissionsController, RoleChangesController],
  providers: [
    RoleRepository,
    RoleChangeRepository,
    { provide: 'RoleService', useExisting: RoleRepository },
    { provide: 'PermService', useExisting: RoleRepository },
    { provide: 'RoleChangeService', useExisting: RoleChangeRepository },
  ],
  exports: [RoleRepository, RoleChangeRepository],
})
export class RolesModule {}

