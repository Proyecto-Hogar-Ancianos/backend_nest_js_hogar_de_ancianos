#!/usr/bin/env python3
"""
Script para crear la estructura completa del proyecto backend_nest_js_hogar_de_ancianos
según la arquitectura definida en el README.md
"""

import os
from pathlib import Path

# Directorio base del proyecto
BASE_DIR = Path(__file__).parent / "src"

# Estructura completa de carpetas
STRUCTURE = {
    "": [
        "main.ts",
        "app.module.ts"
    ],
    "config": [
        "database.config.ts",
        "jwt.config.ts",
        "email.config.ts",
        "app.config.ts",
        "swagger.config.ts"
    ],
    "common/decorators": [
        "roles.decorator.ts",
        "current-user.decorator.ts",
        "public.decorator.ts"
    ],
    "common/guards": [
        "jwt-auth.guard.ts",
        "roles.guard.ts",
        "two-factor.guard.ts"
    ],
    "common/interceptors": [
        "logging.interceptor.ts",
        "transform.interceptor.ts",
        "audit.interceptor.ts"
    ],
    "common/pipes": [
        "validation.pipe.ts"
    ],
    "common/filters": [
        "http-exception.filter.ts"
    ],
    "common/interfaces": [
        "paginated-response.interface.ts",
        "audit-log.interface.ts",
        "jwt-payload.interface.ts"
    ],
    "common/enums": [
        "roles.enum.ts",
        "appointment-status.enum.ts",
        "audit-action.enum.ts"
    ],
    "common/utils": [
        "password.util.ts",
        "date.util.ts",
        "pdf-generator.util.ts"
    ],
    "core/auth": [
        "auth.module.ts"
    ],
    "core/auth/application/services": [
        "auth.service.ts",
        "two-factor.service.ts"
    ],
    "core/auth/application/use-cases": [
        "login.use-case.ts",
        "register.use-case.ts",
        "enable-2fa.use-case.ts",
        "verify-2fa.use-case.ts"
    ],
    "core/auth/domain/entities": [
        "session.entity.ts"
    ],
    "core/auth/domain/repositories": [
        "auth.repository.interface.ts"
    ],
    "core/auth/domain/value-objects": [
        "token.vo.ts"
    ],
    "core/auth/infrastructure/controllers": [
        "auth.controller.ts"
    ],
    "core/auth/infrastructure/dto": [
        "login.dto.ts",
        "register.dto.ts",
        "enable-2fa.dto.ts",
        "verify-2fa.dto.ts"
    ],
    "core/auth/infrastructure/repositories": [
        "auth.repository.ts"
    ],
    "core/auth/infrastructure/strategies": [
        "jwt.strategy.ts",
        "local.strategy.ts"
    ],
    "core/auth/tests": [
        "auth.service.spec.ts"
    ],
    "core/users": [
        "users.module.ts"
    ],
    "core/users/application/services": [
        "users.service.ts"
    ],
    "core/users/application/use-cases": [
        "create-admin.use-case.ts",
        "create-super-admin.use-case.ts",
        "update-user.use-case.ts",
        "deactivate-user.use-case.ts"
    ],
    "core/users/domain/entities": [
        "user.entity.ts"
    ],
    "core/users/domain/repositories": [
        "user.repository.interface.ts"
    ],
    "core/users/domain/value-objects": [
        "email.vo.ts",
        "identification.vo.ts"
    ],
    "core/users/infrastructure/controllers": [
        "users.controller.ts"
    ],
    "core/users/infrastructure/dto": [
        "create-user.dto.ts",
        "update-user.dto.ts",
        "user-response.dto.ts"
    ],
    "core/users/infrastructure/repositories": [
        "user.repository.ts"
    ],
    "core/users/tests": [
        ".gitkeep"
    ],
    "core/roles": [
        "roles.module.ts"
    ],
    "core/roles/application/services": [
        "roles.service.ts",
        "permissions.service.ts"
    ],
    "core/roles/application/use-cases": [
        "create-role.use-case.ts",
        "assign-permissions.use-case.ts"
    ],
    "core/roles/domain/entities": [
        "role.entity.ts",
        "permission.entity.ts"
    ],
    "core/roles/domain/repositories": [
        "role.repository.interface.ts"
    ],
    "core/roles/infrastructure/controllers": [
        "roles.controller.ts"
    ],
    "core/roles/infrastructure/dto": [
        "create-role.dto.ts",
        "assign-permissions.dto.ts"
    ],
    "core/roles/infrastructure/repositories": [
        "role.repository.ts"
    ],
    "core/older-adults": [
        "older-adults.module.ts"
    ],
    "core/older-adults/application/services": [
        "older-adults.service.ts",
        "virtual-record.service.ts"
    ],
    "core/older-adults/application/use-cases": [
        "create-virtual-record.use-case.ts",
        "generate-pdf.use-case.ts",
        "share-with-specialist.use-case.ts"
    ],
    "core/older-adults/domain/entities": [
        "older-adult.entity.ts",
        "family-member.entity.ts",
        "emergency-contact.entity.ts"
    ],
    "core/older-adults/domain/repositories": [
        "older-adult.repository.interface.ts"
    ],
    "core/older-adults/infrastructure/controllers": [
        "older-adults.controller.ts"
    ],
    "core/older-adults/infrastructure/dto": [
        "create-older-adult.dto.ts",
        "update-older-adult.dto.ts",
        "older-adult-response.dto.ts"
    ],
    "core/older-adults/infrastructure/repositories": [
        "older-adult.repository.ts"
    ],
    "core/medical-records": [
        "medical-records.module.ts"
    ],
    "core/medical-records/application/services": [
        "clinical-history.service.ts",
        "medication.service.ts",
        "medical-record.service.ts"
    ],
    "core/medical-records/application/use-cases": [
        "create-clinical-history.use-case.ts",
        "add-medication.use-case.ts"
    ],
    "core/medical-records/domain/entities": [
        "clinical-history.entity.ts",
        "medication.entity.ts",
        "clinical-condition.entity.ts",
        "vaccine.entity.ts",
        "medical-record.entity.ts"
    ],
    "core/medical-records/domain/repositories": [
        "medical-record.repository.interface.ts"
    ],
    "core/medical-records/infrastructure/controllers": [
        "medical-records.controller.ts"
    ],
    "core/medical-records/infrastructure/dto": [
        "create-clinical-history.dto.ts",
        "add-medication.dto.ts"
    ],
    "core/medical-records/infrastructure/repositories": [
        "medical-record.repository.ts"
    ],
    "core/appointments": [
        "appointments.module.ts"
    ],
    "core/appointments/application/services": [
        "appointments.service.ts",
        "nursing.service.ts",
        "physiotherapy.service.ts",
        "psychology.service.ts",
        "social-work.service.ts"
    ],
    "core/appointments/application/use-cases": [
        "schedule-appointment.use-case.ts",
        "register-nursing-care.use-case.ts",
        "generate-medical-report.use-case.ts"
    ],
    "core/appointments/domain/entities": [
        "specialized-area.entity.ts",
        "appointment.entity.ts",
        "nursing-record.entity.ts",
        "physiotherapy-session.entity.ts",
        "psychology-session.entity.ts",
        "social-work-report.entity.ts"
    ],
    "core/appointments/domain/repositories": [
        "appointment.repository.interface.ts"
    ],
    "core/appointments/infrastructure/controllers": [
        "appointments.controller.ts",
        "nursing.controller.ts"
    ],
    "core/appointments/infrastructure/dto": [
        "schedule-appointment.dto.ts",
        "register-nursing-care.dto.ts",
        "appointment-response.dto.ts"
    ],
    "core/appointments/infrastructure/repositories": [
        "appointment.repository.ts"
    ],
    "core/programs": [
        "programs.module.ts"
    ],
    "core/programs/application/services": [
        "programs.service.ts"
    ],
    "core/programs/application/use-cases": [
        "create-program.use-case.ts",
        "add-participant.use-case.ts"
    ],
    "core/programs/domain/entities": [
        "program.entity.ts",
        "program-participant.entity.ts"
    ],
    "core/programs/domain/repositories": [
        "program.repository.interface.ts"
    ],
    "core/programs/infrastructure/controllers": [
        "programs.controller.ts"
    ],
    "core/programs/infrastructure/dto": [
        "create-program.dto.ts",
        "add-participant.dto.ts"
    ],
    "core/programs/infrastructure/repositories": [
        "program.repository.ts"
    ],
    "core/audit": [
        "audit.module.ts"
    ],
    "core/audit/application/services": [
        "audit.service.ts",
        "audit-report.service.ts"
    ],
    "core/audit/application/use-cases": [
        "log-action.use-case.ts",
        "generate-audit-report.use-case.ts"
    ],
    "core/audit/domain/entities": [
        "digital-record.entity.ts",
        "role-change.entity.ts",
        "older-adult-update.entity.ts",
        "audit-report.entity.ts"
    ],
    "core/audit/domain/repositories": [
        "audit.repository.interface.ts"
    ],
    "core/audit/infrastructure/controllers": [
        "audit.controller.ts"
    ],
    "core/audit/infrastructure/dto": [
        "log-action.dto.ts",
        "generate-report.dto.ts"
    ],
    "core/audit/infrastructure/repositories": [
        "audit.repository.ts"
    ],
    "core/notifications": [
        "notifications.module.ts"
    ],
    "core/notifications/application/services": [
        "email.service.ts"
    ],
    "core/notifications/application/use-cases": [
        "send-credentials.use-case.ts",
        "send-appointment-reminder.use-case.ts"
    ],
    "core/notifications/domain/interfaces": [
        "email-options.interface.ts"
    ],
    "core/notifications/infrastructure/templates": [
        "credentials.template.ts",
        "appointment-reminder.template.ts"
    ],
    "core/notifications/infrastructure/providers": [
        "nodemailer.provider.ts"
    ],
    "core/backups": [
        "backups.module.ts"
    ],
    "core/backups/application/services": [
        "backup.service.ts"
    ],
    "core/backups/application/use-cases": [
        "execute-backup.use-case.ts"
    ],
    "core/backups/infrastructure/controllers": [
        "backups.controller.ts"
    ],
    "core/backups/infrastructure/scripts": [
        "mysql-backup.sh"
    ],
    "core/access-control": [
        "access-control.module.ts"
    ],
    "core/access-control/application/services": [
        "entrance-exit.service.ts"
    ],
    "core/access-control/domain/entities": [
        "entrance-exit.entity.ts"
    ],
    "core/access-control/domain/repositories": [
        "access-control.repository.interface.ts"
    ],
    "core/access-control/infrastructure/controllers": [
        "access-control.controller.ts"
    ],
    "core/access-control/infrastructure/dto": [
        "register-access.dto.ts"
    ],
    "core/access-control/infrastructure/repositories": [
        "access-control.repository.ts"
    ],
    "shared/database": [
        "database.module.ts"
    ],
    "shared/database/migrations": [
        ".gitkeep"
    ],
    "shared/logger": [
        "logger.module.ts",
        "logger.service.ts"
    ],
    "shared/health": [
        "health.module.ts",
        "health.controller.ts"
    ]
}

# Carpetas adicionales fuera de src
ADDITIONAL_DIRS = [
    "test",
    "docker",
    "scripts"
]

ADDITIONAL_FILES = {
    "test": [
        "app.e2e-spec.ts",
        "jest-e2e.json"
    ],
    "docker": [
        "Dockerfile",
        "docker-compose.yml"
    ],
    "scripts": [
        "backup-to-drive.sh"
    ]
}


def create_structure():
    """Crea toda la estructura de carpetas y archivos"""
    print("🚀 Iniciando creación de estructura del proyecto...")
    print(f"📁 Directorio base: {BASE_DIR}")
    
    # Crear estructura dentro de src/
    for path, files in STRUCTURE.items():
        full_path = BASE_DIR / path
        full_path.mkdir(parents=True, exist_ok=True)
        print(f"✅ Creado: {full_path}")
        
        # Crear archivos
        for file in files:
            file_path = full_path / file
            if not file_path.exists():
                file_path.touch()
                print(f"  📄 Creado archivo: {file}")
    
    # Crear carpetas adicionales
    project_root = BASE_DIR.parent
    for dir_name in ADDITIONAL_DIRS:
        dir_path = project_root / dir_name
        dir_path.mkdir(parents=True, exist_ok=True)
        print(f"✅ Creado: {dir_path}")
        
        # Crear archivos adicionales
        if dir_name in ADDITIONAL_FILES:
            for file in ADDITIONAL_FILES[dir_name]:
                file_path = dir_path / file
                if not file_path.exists():
                    file_path.touch()
                    print(f"  📄 Creado archivo: {file}")
    
    print("\n✨ ¡Estructura creada exitosamente!")
    print("\n📋 Resumen:")
    print(f"   - Módulos core: 10")
    print(f"   - Módulos shared: 3")
    print(f"   - Common utilities: 7 categorías")
    print(f"   - Archivos de configuración: 5")
    print("\n🎯 Siguiente paso: Revisar la estructura con 'tree src' o tu explorador de archivos")


if __name__ == "__main__":
    try:
        create_structure()
    except Exception as e:
        print(f"\n❌ Error al crear estructura: {e}")
        import traceback
        traceback.print_exc()
