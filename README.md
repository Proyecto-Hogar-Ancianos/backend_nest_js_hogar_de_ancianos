# Sistema Integral de Gestión para Hogar de Ancianos

![NestJS](https://img.shields.io/badge/NestJS-10.0-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-24.0-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

![Status](https://img.shields.io/badge/Status-En_Desarrollo-yellow?style=for-the-badge)
![Created By](https://img.shields.io/badge/Creado_por-TonyML_|_Luis_|_Jona-%23ff69b4?style=for-the-badge&logo=starship&logoColor=white)

> **SISTEMA DE AUTENTICACIÓN ACTUALIZADO**  
> Este proyecto incluye un flujo completo de autenticación multi-capa con JWT, 2FA/TOTP, gestión de sesiones persistentes y auditoría. Consulta la sección [Flujo de Autenticación y Seguridad](#flujo-de-autenticación-y-seguridad) para más detalles.

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Características Principales](#características-principales)
- [Arquitectura del Sistema](#arquitectura-del-sistema)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Ejecución](#ejecución)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Flujo de Autenticación y Seguridad](#flujo-de-autenticación-y-seguridad)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contribución](#contribución)
- [Licencia](#licencia)

---

## Descripción

Sistema backend desarrollado con NestJS para la gestión integral de un hogar de ancianos, incluyendo administración de residentes, historiales médicos, citas especializadas, auditoría completa y control de acceso basado en roles (RBAC).

Este sistema reemplaza el sistema manual basado en expedientes físicos, digitalizando y centralizando toda la información administrativa, médica y social de los adultos mayores de forma segura, eficiente y confiable.

---

## Características Principales

- **Autenticación Segura Multi-Capa**: 
  - JWT (Access Token + Refresh Token)
  - Autenticación de Dos Factores (2FA/TOTP)
  - Gestión de sesiones persistentes con auditoría
  - Tokens con expiración configurable (15 min / 7 días)
- **Control de Acceso por Roles (RBAC)**: Super Admin, Admin, Director, Enfermero, Fisioterapeuta, Psicólogo, Trabajador Social
- **Gestión de Expedientes Digitales**: Creación, edición y consulta de fichas virtuales de adultos mayores
- **Historiales Médicos Completos**: Registro de antecedentes clínicos, medicación, vacunas y condiciones
- **Sistema de Citas Especializadas**: Programación y registro de atenciones en enfermería, fisioterapia, psicología y trabajo social
- **Auditoría Completa**: Logs de todas las acciones con trazabilidad total (incluye intentos de login)
- **Notificaciones por Email**: Envío automático de credenciales, recordatorios de citas y alertas
- **Generación de Reportes PDF**: Exportación de fichas virtuales y reportes médicos
- **Backups Automatizados**: Respaldo diario a Google Drive con retención configurable
- **Documentación API Interactiva**: Swagger UI integrado

---

## Arquitectura del Sistema

El sistema implementa **Clean Architecture** con separación en capas:

```
Domain Layer (Entidades y Lógica de Negocio)
      ↓
Application Layer (Casos de Uso y Servicios)
      ↓
Infrastructure Layer (Controllers, Repositories, DTOs)
```

**Patrones de Diseño Aplicados**:
- Repository Pattern
- Dependency Injection (IoC)
- Strategy Pattern (para estrategias de autenticación)
- Factory Pattern (para generación de PDFs)
- Observer Pattern (para auditoría mediante interceptors)

**Principios SOLID**:
- Single Responsibility: Cada servicio tiene una única responsabilidad
- Open/Closed: Extensible mediante módulos sin modificar código existente
- Liskov Substitution: Interfaces de repositorios intercambiables
- Interface Segregation: Interfaces específicas por funcionalidad
- Dependency Inversion: Dependencias inyectadas mediante IoC de NestJS

---

## Tecnologías Utilizadas

| Categoría | Tecnología |
|-----------|-----------|
| Framework | NestJS 10.x |
| Lenguaje | TypeScript 5.x |
| Base de Datos | MySQL 8.0 |
| ORM | TypeORM 0.3.x |
| Autenticación | Passport.js, JWT, Speakeasy (2FA) |
| Validación | class-validator, class-transformer |
| Documentación | Swagger/OpenAPI 3.0 |
| Logs | Winston |
| Email | Nodemailer |
| PDFs | PDFKit |
| Testing | Jest, Supertest |
| Contenedores | Docker, Docker Compose |
| Linting | ESLint, Prettier |

---

## Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

- **Node.js**: v20.x LTS o superior
- **npm**: v10.x o superior
- **MySQL**: v8.0 o superior
- **Docker** (opcional): v24.x o superior
- **Git**: v2.40 o superior

---

## Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/tu-usuario/backend_nest_js_hogar_de_ancianos.git
cd backend_nest_js_hogar_de_ancianos
```

### 2. Instalar Dependencias

```bash
npm install
```

### 3. Configurar Variables de Entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` con tus credenciales:

```bash
nano .env  # o usa tu editor preferido
```

### 4. Configurar Base de Datos

#### Opción A: MySQL Local

```bash
# Crear la base de datos
mysql -u root -p < scripts/database.sql
```

#### Opción B: Docker Compose

```bash
docker-compose up -d mysql
```

### 5. Ejecutar Migraciones

```bash
npm run migration:run
```

---

## Configuración

### Variables de Entorno Críticas

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `JWT_SECRET` | Clave secreta para tokens JWT | `your_super_secret_key` |
| `DB_PASSWORD` | Contraseña de MySQL | `your_db_password` |
| `EMAIL_PASSWORD` | Contraseña de aplicación de Gmail | `xxxx xxxx xxxx xxxx` |
| `GOOGLE_DRIVE_FOLDER_ID` | ID de carpeta de Google Drive para backups | `1AbC2DeF3GhI4JkL` |

> **Nota**: Para información completa sobre autenticación y 2FA, consulta la sección [Flujo de Autenticación y Seguridad](#flujo-de-autenticación-y-seguridad).

---

## Ejecución

### Modo Desarrollo

```bash
# Ejecutar con hot-reload
npm run start:dev

# Ejecutar con logs en consola
npm run start:dev -- --watch
```

El servidor estará disponible en: `http://localhost:3000`

Documentación Swagger: `http://localhost:3000/api/docs`

### Modo Producción

```bash
# Compilar el proyecto
npm run build

# Ejecutar aplicación compilada
npm run start:prod
```

### Docker (Recomendado para Producción)

```bash
# Levantar todos los servicios
docker-compose up -d

# Ver logs
docker-compose logs -f backend

# Detener servicios
docker-compose down
```

---

## Estructura del Proyecto

```
src/
├── main.ts                      # Bootstrap principal
├── app.module.ts                # Módulo raíz
├── config/                      # Configuraciones
├── common/                      # Recursos compartidos (guards, decorators, pipes)
├── core/                        # Módulos de dominio
│   ├── auth/                    # Autenticación y 2FA
│   ├── users/                   # Gestión de usuarios
│   ├── roles/                   # Roles y permisos
│   ├── older-adults/            # Adultos mayores
│   ├── medical-records/         # Historiales médicos (Ficha virtual)
│   ├── appointments/            # Citas especializadas
│   ├── programs/                # Programas del hogar
│   ├── audit/                   # Auditoría y logs
│   ├── notifications/           # Notificaciones email
│   ├── backups/                 # Backups automatizados
│   └── access-control/          # Control de entradas/salidas
└── shared/                      # Módulos compartidos (database, logger, health)
```

Cada módulo sigue la arquitectura por capas:

```
modulo/
├── application/      # Lógica de negocio (services, use-cases)
├── domain/           # Entidades, interfaces, value objects
└── infrastructure/   # Controllers, DTOs, repositories
```

```
Estructura de Módulos por Capas 

backend_nest_js_hogar_de_ancianos/
│
├── src/
│   ├── main.ts                                    # Bootstrap de la aplicación
│   │
│   ├── app.module.ts                              # Módulo raíz
│   │
│   ├── config/                                    #  Capa de Configuración
│   │   ├── database.config.ts                     # Configuración TypeORM
│   │   ├── jwt.config.ts                          # Configuración JWT
│   │   ├── email.config.ts                        # Configuración Nodemailer
│   │   ├── app.config.ts                          # Configuración general
│   │   └── swagger.config.ts                      # Configuración Swagger
│   │
│   ├── common/                                    #  Capa Común (Shared)
│   │   ├── decorators/                            # Decoradores personalizados
│   │   │   ├── roles.decorator.ts
│   │   │   ├── current-user.decorator.ts
│   │   │   └── public.decorator.ts
│   │   │
│   │   ├── guards/                                # Guards de seguridad
│   │   │   ├── jwt-auth.guard.ts
│   │   │   ├── roles.guard.ts
│   │   │   └── two-factor.guard.ts
│   │   │
│   │   ├── interceptors/                          # Interceptors
│   │   │   ├── logging.interceptor.ts
│   │   │   ├── transform.interceptor.ts
│   │   │   └── audit.interceptor.ts
│   │   │
│   │   ├── pipes/                                 # Pipes de validación
│   │   │   └── validation.pipe.ts
│   │   │
│   │   ├── filters/                               # Filtros de excepción
│   │   │   └── http-exception.filter.ts
│   │   │
│   │   ├── interfaces/                            # Interfaces compartidas
│   │   │   ├── paginated-response.interface.ts
│   │   │   ├── audit-log.interface.ts
│   │   │   └── jwt-payload.interface.ts
│   │   │
│   │   ├── enums/                                 # Enums compartidos
│   │   │   ├── roles.enum.ts
│   │   │   ├── appointment-status.enum.ts
│   │   │   └── audit-action.enum.ts
│   │   │
│   │   └── utils/                                 # Utilidades
│   │       ├── password.util.ts
│   │       ├── date.util.ts
│   │       └── pdf-generator.util.ts
│   │
│   ├── core/                                      #  Capa Core (Dominio)
│   │   │
│   │   ├── auth/                                  #  Módulo de Autenticación
│   │   │   ├── auth.module.ts
│   │   │   ├── application/
│   │   │   │   ├── services/
│   │   │   │   │   ├── auth.service.ts            # Lógica de autenticación
│   │   │   │   │   └── two-factor.service.ts      # Lógica 2FA
│   │   │   │   └── use-cases/
│   │   │   │       ├── login.use-case.ts
│   │   │   │       ├── register.use-case.ts
│   │   │   │       ├── enable-2fa.use-case.ts
│   │   │   │       └── verify-2fa.use-case.ts
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── session.entity.ts
│   │   │   │   ├── repositories/
│   │   │   │   │   └── auth.repository.interface.ts
│   │   │   │   └── value-objects/
│   │   │   │       └── token.vo.ts
│   │   │   ├── infrastructure/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── auth.controller.ts
│   │   │   │   ├── dto/
│   │   │   │   │   ├── login.dto.ts
│   │   │   │   │   ├── register.dto.ts
│   │   │   │   │   ├── enable-2fa.dto.ts
│   │   │   │   │   └── verify-2fa.dto.ts
│   │   │   │   ├── repositories/
│   │   │   │   │   └── auth.repository.ts
│   │   │   │   └── strategies/
│   │   │   │       ├── jwt.strategy.ts
│   │   │   │       └── local.strategy.ts
│   │   │   └── tests/
│   │   │       └── auth.service.spec.ts
│   │   │
│   │   ├── users/                                 #  Módulo de Usuarios
│   │   │   ├── users.module.ts
│   │   │   ├── application/
│   │   │   │   ├── services/
│   │   │   │   │   └── users.service.ts
│   │   │   │   └── use-cases/
│   │   │   │       ├── create-admin.use-case.ts
│   │   │   │       ├── create-super-admin.use-case.ts
│   │   │   │       ├── update-user.use-case.ts
│   │   │   │       └── deactivate-user.use-case.ts
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   └── user.entity.ts
│   │   │   │   ├── repositories/
│   │   │   │   │   └── user.repository.interface.ts
│   │   │   │   └── value-objects/
│   │   │   │       ├── email.vo.ts
│   │   │   │       └── identification.vo.ts
│   │   │   ├── infrastructure/
│   │   │   │   ├── controllers/
│   │   │   │   │   └── users.controller.ts
│   │   │   │   ├── dto/
│   │   │   │   │   ├── create-user.dto.ts
│   │   │   │   │   ├── update-user.dto.ts
│   │   │   │   │   └── user-response.dto.ts
│   │   │   │   └── repositories/
│   │   │   │       └── user.repository.ts
│   │   │   └── tests/
│   │   │
│   │   ├── roles/                                 #  Módulo de Roles y Permisos
│   │   │   ├── roles.module.ts
│   │   │   ├── application/
│   │   │   │   ├── services/
│   │   │   │   │   ├── roles.service.ts
│   │   │   │   │   └── permissions.service.ts
│   │   │   │   └── use-cases/
│   │   │   │       ├── create-role.use-case.ts
│   │   │   │       └── assign-permissions.use-case.ts
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── role.entity.ts
│   │   │   │   │   └── permission.entity.ts
│   │   │   │   └── repositories/
│   │   │   │       └── role.repository.interface.ts
│   │   │   └── infrastructure/
│   │   │       ├── controllers/
│   │   │       │   └── roles.controller.ts
│   │   │       ├── dto/
│   │   │       │   ├── create-role.dto.ts
│   │   │       │   └── assign-permissions.dto.ts
│   │   │       └── repositories/
│   │   │           └── role.repository.ts
│   │   │
│   │   ├── older-adults/                          #  Módulo de Adultos Mayores
│   │   │   ├── older-adults.module.ts
│   │   │   ├── application/
│   │   │   │   ├── services/
│   │   │   │   │   ├── older-adults.service.ts
│   │   │   │   │   └── virtual-record.service.ts
│   │   │   │   └── use-cases/
│   │   │   │       ├── create-virtual-record.use-case.ts
│   │   │   │       ├── generate-pdf.use-case.ts
│   │   │   │       └── share-with-specialist.use-case.ts
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── older-adult.entity.ts
│   │   │   │   │   ├── family-member.entity.ts
│   │   │   │   │   └── emergency-contact.entity.ts
│   │   │   │   └── repositories/
│   │   │   │       └── older-adult.repository.interface.ts
│   │   │   └── infrastructure/
│   │   │       ├── controllers/
│   │   │       │   └── older-adults.controller.ts
│   │   │       ├── dto/
│   │   │       │   ├── create-older-adult.dto.ts
│   │   │       │   ├── update-older-adult.dto.ts
│   │   │       │   └── older-adult-response.dto.ts
│   │   │       └── repositories/
│   │   │           └── older-adult.repository.ts
│   │   │
│   │   ├── medical-records/                       #  Módulo de Historiales Médicos
│   │   │   ├── medical-records.module.ts
│   │   │   ├── application/
│   │   │   │   ├── services/
│   │   │   │   │   ├── clinical-history.service.ts
│   │   │   │   │   ├── medication.service.ts
│   │   │   │   │   └── medical-record.service.ts
│   │   │   │   └── use-cases/
│   │   │   │       ├── create-clinical-history.use-case.ts
│   │   │   │       └── add-medication.use-case.ts
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── clinical-history.entity.ts
│   │   │   │   │   ├── medication.entity.ts
│   │   │   │   │   ├── clinical-condition.entity.ts
│   │   │   │   │   ├── vaccine.entity.ts
│   │   │   │   │   └── medical-record.entity.ts
│   │   │   │   └── repositories/
│   │   │   │       └── medical-record.repository.interface.ts
│   │   │   └── infrastructure/
│   │   │       ├── controllers/
│   │   │       │   └── medical-records.controller.ts
│   │   │       ├── dto/
│   │   │       │   ├── create-clinical-history.dto.ts
│   │   │       │   └── add-medication.dto.ts
│   │   │       └── repositories/
│   │   │           └── medical-record.repository.ts
│   │   │
│   │   ├── appointments/                          #  Módulo de Citas
│   │   │   ├── appointments.module.ts
│   │   │   ├── application/
│   │   │   │   ├── services/
│   │   │   │   │   ├── appointments.service.ts
│   │   │   │   │   ├── nursing.service.ts
│   │   │   │   │   ├── physiotherapy.service.ts
│   │   │   │   │   ├── psychology.service.ts
│   │   │   │   │   └── social-work.service.ts
│   │   │   │   └── use-cases/
│   │   │   │       ├── schedule-appointment.use-case.ts
│   │   │   │       ├── register-nursing-care.use-case.ts
│   │   │   │       └── generate-medical-report.use-case.ts
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── specialized-area.entity.ts
│   │   │   │   │   ├── appointment.entity.ts
│   │   │   │   │   ├── nursing-record.entity.ts
│   │   │   │   │   ├── physiotherapy-session.entity.ts
│   │   │   │   │   ├── psychology-session.entity.ts
│   │   │   │   │   └── social-work-report.entity.ts
│   │   │   │   └── repositories/
│   │   │   │       └── appointment.repository.interface.ts
│   │   │   └── infrastructure/
│   │   │       ├── controllers/
│   │   │       │   ├── appointments.controller.ts
│   │   │       │   └── nursing.controller.ts
│   │   │       ├── dto/
│   │   │       │   ├── schedule-appointment.dto.ts
│   │   │       │   ├── register-nursing-care.dto.ts
│   │   │       │   └── appointment-response.dto.ts
│   │   │       └── repositories/
│   │   │           └── appointment.repository.ts
│   │   │
│   │   ├── programs/                              #  Módulo de Programas
│   │   │   ├── programs.module.ts
│   │   │   ├── application/
│   │   │   │   ├── services/
│   │   │   │   │   └── programs.service.ts
│   │   │   │   └── use-cases/
│   │   │   │       ├── create-program.use-case.ts
│   │   │   │       └── add-participant.use-case.ts
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── program.entity.ts
│   │   │   │   │   └── program-participant.entity.ts
│   │   │   │   └── repositories/
│   │   │   │       └── program.repository.interface.ts
│   │   │   └── infrastructure/
│   │   │       ├── controllers/
│   │   │       │   └── programs.controller.ts
│   │   │       ├── dto/
│   │   │       │   ├── create-program.dto.ts
│   │   │       │   └── add-participant.dto.ts
│   │   │       └── repositories/
│   │   │           └── program.repository.ts
│   │   │
│   │   ├── audit/                                 #  Módulo de Auditoría
│   │   │   ├── audit.module.ts
│   │   │   ├── application/
│   │   │   │   ├── services/
│   │   │   │   │   ├── audit.service.ts
│   │   │   │   │   └── audit-report.service.ts
│   │   │   │   └── use-cases/
│   │   │   │       ├── log-action.use-case.ts
│   │   │   │       └── generate-audit-report.use-case.ts
│   │   │   ├── domain/
│   │   │   │   ├── entities/
│   │   │   │   │   ├── digital-record.entity.ts
│   │   │   │   │   ├── role-change.entity.ts
│   │   │   │   │   ├── older-adult-update.entity.ts
│   │   │   │   │   └── audit-report.entity.ts
│   │   │   │   └── repositories/
│   │   │   │       └── audit.repository.interface.ts
│   │   │   └── infrastructure/
│   │   │       ├── controllers/
│   │   │       │   └── audit.controller.ts
│   │   │       ├── dto/
│   │   │       │   ├── log-action.dto.ts
│   │   │       │   └── generate-report.dto.ts
│   │   │       └── repositories/
│   │   │           └── audit.repository.ts
│   │   │
│   │   ├── notifications/                         #  Módulo de Notificaciones
│   │   │   ├── notifications.module.ts
│   │   │   ├── application/
│   │   │   │   ├── services/
│   │   │   │   │   └── email.service.ts
│   │   │   │   └── use-cases/
│   │   │   │       ├── send-credentials.use-case.ts
│   │   │   │       └── send-appointment-reminder.use-case.ts
│   │   │   ├── domain/
│   │   │   │   └── interfaces/
│   │   │   │       └── email-options.interface.ts
│   │   │   └── infrastructure/
│   │   │       ├── templates/
│   │   │       │   ├── credentials.template.ts
│   │   │       │   └── appointment-reminder.template.ts
│   │   │       └── providers/
│   │   │           └── nodemailer.provider.ts
│   │   │
│   │   ├── backups/                               #  Módulo de Backups
│   │   │   ├── backups.module.ts
│   │   │   ├── application/
│   │   │   │   ├── services/
│   │   │   │   │   └── backup.service.ts
│   │   │   │   └── use-cases/
│   │   │   │       └── execute-backup.use-case.ts
│   │   │   └── infrastructure/
│   │   │       ├── controllers/
│   │   │       │   └── backups.controller.ts
│   │   │       └── scripts/
│   │   │           └── mysql-backup.sh
│   │   │
│   │   └── access-control/                        #  Módulo de Control de Acceso
│   │       ├── access-control.module.ts
│   │       ├── application/
│   │       │   └── services/
│   │       │       └── entrance-exit.service.ts
│   │       ├── domain/
│   │       │   ├── entities/
│   │       │   │   └── entrance-exit.entity.ts
│   │       │   └── repositories/
│   │       │       └── access-control.repository.interface.ts
│   │       └── infrastructure/
│   │           ├── controllers/
│   │           │   └── access-control.controller.ts
│   │           ├── dto/
│   │           │   └── register-access.dto.ts
│   │           └── repositories/
│   │               └── access-control.repository.ts
│   │
│   └── shared/                                    #  Módulo Compartido
│       ├── database/
│       │   ├── database.module.ts
│       │   └── migrations/
│       ├── logger/
│       │   ├── logger.module.ts
│       │   └── logger.service.ts
│       └── health/
│           ├── health.module.ts
│           └── health.controller.ts
│
├── test/                                          #  Tests E2E
│   ├── app.e2e-spec.ts
│   └── jest-e2e.json
│
├── docker/
│   ├── Dockerfile
│   └── docker-compose.yml
│
├── scripts/
│   └── backup-to-drive.sh
│
├── .env.example
├── .env
├── .gitignore
├── .eslintrc.js
├── .prettierrc
├── nest-cli.json
├── tsconfig.json
├── tsconfig.build.json
├── package.json
├── README.md
└── LICENSE
```

---

## Flujo de Autenticación y Seguridad

El sistema implementa un **flujo de autenticación robusto y seguro** con múltiples capas de protección:

### Arquitectura de Seguridad

```
┌─────────────────────────────────────────────────────────────────┐
│                    CAPA DE SEGURIDAD                             │
├─────────────────────────────────────────────────────────────────┤
│  1. JWT (Access Token + Refresh Token)                          │
│  2. Autenticación de Dos Factores (2FA/TOTP)                   │
│  3. Gestión de Sesiones Persistentes                            │
│  4. Auditoría de Intentos de Login                              │
│  5. Control de Acceso Basado en Roles (RBAC)                   │
└─────────────────────────────────────────────────────────────────┘
```

---

### Flujo Completo de Autenticación

#### **Paso 1: Login Inicial (POST /auth/login)**

```typescript
// Request
POST /auth/login
{
  "email": "admin@hogar.com",
  "password": "SecurePass123!"
}

// Response (sin 2FA habilitado)
{
  "requiresTwoFactor": false,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@hogar.com",
    "name": "Juan Pérez García",
    "roleId": 2
  }
}

// Response (CON 2FA habilitado)
{
  "requiresTwoFactor": true,
  "tempToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**¿Qué hace el servidor?**
1. ✅ Busca el usuario por email
2. ✅ Verifica que esté activo (`isActive = true`)
3. ✅ Compara la contraseña con bcrypt
4. ✅ Registra el intento en `login_attempts`
5. ✅ Verifica si tiene 2FA habilitado
   - **SIN 2FA**: Genera `accessToken` + `refreshToken` y crea sesión
   - **CON 2FA**: Genera `tempToken` (válido 5 minutos)

---

#### **Paso 2: Verificación 2FA (POST /auth/verify-2fa)** *(solo si tiene 2FA)*

```typescript
// Request
POST /auth/verify-2fa
{
  "sessionToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",  // tempToken del paso anterior
  "token": "123456"  // Código de 6 dígitos de Google Authenticator / 2FAS
}

// Response
{
  "requiresTwoFactor": false,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@hogar.com",
    "name": "Juan Pérez García",
    "roleId": 2
  }
}
```

**¿Qué hace el servidor?**
1. ✅ Verifica que el `tempToken` sea válido y no haya expirado (< 5 min)
2. ✅ Verifica que el payload incluya `require2FA: true`
3. ✅ Verifica el código TOTP de 6 dígitos con ventana de ±5 minutos
4. ✅ Registra el intento en `login_attempts`
5. ✅ Genera tokens finales y crea sesión persistente

---

#### **Paso 3: Tokens JWT**

El sistema usa **dos tipos de tokens**:

| Token | Duración | Uso |
|-------|----------|-----|
| **Access Token** | 15 minutos | Autenticación de requests API |
| **Refresh Token** | 7 días | Renovar access token sin re-login |

**Estructura del Access Token (JWT Payload):**
```json
{
  "sub": 1,              // User ID
  "email": "admin@hogar.com",
  "roleId": 2,
  "iat": 1728920445,     // Issued at
  "exp": 1728921345      // Expires at (+15 min)
}
```

---

#### **Paso 4: Gestión de Sesiones**

Cada login crea una **sesión persistente** en la base de datos:

```typescript
// Tabla: user_sessions
{
  id: 1,
  userId: 1,
  sessionToken: "sha256_hash_of_access_token",  // Hash SHA-256
  refreshToken: "sha256_hash_of_refresh_token",
  ipAddress: "192.168.1.100",
  userAgent: "Mozilla/5.0...",
  isActive: true,
  expiresAt: "2025-10-21T15:30:00Z",  // +7 días
  createdAt: "2025-10-14T15:30:00Z",
  lastActivity: "2025-10-14T15:35:00Z"
}
```

**Beneficios:**
- Permite invalidar sesiones específicas
- Permite cerrar todas las sesiones remotamente
- Auditoría de dispositivos activos
- Detección de actividad sospechosa

---

#### **Paso 5: Renovación de Token (POST /auth/refresh)**

Cuando el **access token expira** (después de 15 min), el cliente puede renovarlo:

```typescript
// Request
POST /auth/refresh
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

// Response
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."  // Nuevo token válido 15 min
}
```

**¿Qué hace el servidor?**
1. ✅ Verifica el `refreshToken` con JWT
2. ✅ Busca la sesión activa en `user_sessions` por hash
3. ✅ Verifica que no haya expirado (< 7 días)
4. ✅ Genera nuevo `accessToken`
5. ✅ Actualiza `lastActivity` de la sesión

---

#### **Paso 6: Protección de Rutas con Guards**

Todas las rutas protegidas pasan por **JwtAuthGuard**:

```typescript
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Get('me')
async getProfile(@CurrentUser() user: any) {
  return user;
}
```

**Flujo del JwtAuthGuard:**
```
1. Extrae token del header: Authorization: Bearer <token>
2. Verifica JWT (firma + expiración)
3. ❌ Si require2FA=true → Rechaza (token temporal)
4. Busca sesión activa en user_sessions
5. ❌ Si no existe o isActive=false → Rechaza
6. ❌ Si expiró (expiresAt < now) → Rechaza
7. ✅ Actualiza lastActivity
8. ✅ Inyecta user en request.user
```

---

### Autenticación de Dos Factores (2FA/TOTP)

#### **Configuración de 2FA**

**Paso 1: Generar Secret (POST /auth/2fa/generate)**

```typescript
// Request (requiere estar autenticado)
POST /auth/2fa/generate
Authorization: Bearer <accessToken>

// Response
{
  "message": "Escanea el código QR con tu app 2FAS",
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANS...",  // QR en base64
  "secret": "K5SGG3SRO5KG4PSQG4ZXIZCTIE4E6V3W",          // Secret base32
  "backupCodes": [
    "8303C8A4", "A670337A", "7E1AE6E0", ...  // 10 códigos de respaldo
  ],
  "instructions": [...]
}
```

**¿Qué hace el servidor?**
1. Genera un **secret TOTP** con `speakeasy` (20 bytes = 32 caracteres base32)
2. Genera 10 **códigos de respaldo** (8 caracteres hexadecimales cada uno)
3. Guarda en `user_two_factor` con `tfaEnabled: false`
4. Genera QR code con `qrcode` library

**Paso 2: Escanear QR en la App**

Usa una app compatible TOTP:
- **Google Authenticator** (Android/iOS)
- **2FAS** (Android/iOS) - Recomendado
- **Microsoft Authenticator**
- **Authy**

**Paso 3: Habilitar 2FA (POST /auth/2fa/enable)**

```typescript
// Request
POST /auth/2fa/enable
Authorization: Bearer <accessToken>
{
  "token": "123456"  // Código actual de 6 dígitos de la app
}

// Response
{
  "success": true,
  "message": "2FA habilitado exitosamente. Ahora tu cuenta está más segura."
}
```

**¿Qué hace el servidor?**
1. Llama a `verifyTwoFactorToken(userId, token)`
2. Verifica el código TOTP con `window: 10` (±5 minutos de tolerancia)
3. Si es válido, actualiza `tfaEnabled: true` en `user_two_factor`

---

#### **Verificación TOTP**

El sistema usa el algoritmo **TOTP (Time-based One-Time Password)** definido en [RFC 6238](https://datatracker.ietf.org/doc/html/rfc6238):

```
TOTP = HOTP(K, T)

Donde:
- K = Secret compartido (base32)
- T = (UnixTimestamp / 30)  // Período de 30 segundos
```

**Características:**
- Códigos de **6 dígitos numéricos**
- Cambian cada **30 segundos**
- Ventana de tolerancia: **±5 minutos** (window: 10)
- Sincronización basada en hora UTC

**Códigos de Respaldo:**
- **10 códigos hexadecimales** de 8 caracteres
- Se usan **una sola vez** (se eliminan después)
- Útiles si pierdes el teléfono

---

#### **Endpoints de 2FA**

| Método | Endpoint | Descripción | Auth |
|--------|----------|-------------|------|
| POST | `/auth/2fa/generate` | Generar secret y QR | JWT |
| POST | `/auth/2fa/enable` | Habilitar 2FA | JWT |
| POST | `/auth/2fa/disable` | Deshabilitar 2FA | JWT |
| GET | `/auth/2fa/status` | Ver estado de 2FA | JWT |
| POST | `/auth/2fa/regenerate-backup-codes` | Regenerar códigos de respaldo | JWT |
| GET | `/auth/2fa/debug` | [DEBUG] Ver códigos válidos actuales | JWT |

**Nota**: El endpoint `/auth/2fa/debug` es solo para depuración y debe eliminarse en producción.

---

### Control de Acceso Basado en Roles (RBAC)

El sistema usa **RolesGuard** para validar permisos:

```typescript
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SuperAdmin, Role.Admin)
@Get('users')
async getUsers() {
  return this.usersService.findAll();
}
```

**Jerarquía de Roles:**
```
Super Admin (ID: 1)     → Acceso total al sistema
    ↓
Admin (ID: 2)           → Gestión de usuarios y adultos mayores
    ↓
Director (ID: 3)        → Supervisión general
    ↓
Enfermero (ID: 4)       → Atención médica y citas
Fisioterapeuta (ID: 5)  → Sesiones de fisioterapia
Psicólogo (ID: 6)       → Sesiones psicológicas
Trabajador Social (ID: 7) → Informes sociales
```

---

### Auditoría de Autenticación

Todos los intentos de login se registran en `login_attempts`:

```sql
CREATE TABLE login_attempts (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NULL,
  email VARCHAR(255) NOT NULL,
  ip_address VARCHAR(45) NULL,
  attempt_successful BOOLEAN DEFAULT FALSE,
  failure_reason VARCHAR(100) NULL,  -- 'user_not_found', 'invalid_password', 'requires_2fa', 'invalid_2fa'
  attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Razones de fallo:**
- `user_not_found`: Email no existe
- `user_inactive`: Usuario desactivado
- `invalid_password`: Contraseña incorrecta
- `requires_2fa`: Requiere verificación 2FA
- `invalid_2fa`: Código 2FA inválido

---

### Gestión de Sesiones

#### **Ver Sesiones Activas (GET /auth/sessions)**

```typescript
// Response
{
  "sessions": [
    {
      "id": 1,
      "ipAddress": "192.168.1.100",
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)...",
      "createdAt": "2025-10-14T15:30:00Z",
      "lastActivity": "2025-10-14T18:45:00Z",
      "expiresAt": "2025-10-21T15:30:00Z"
    },
    {
      "id": 2,
      "ipAddress": "192.168.1.150",
      "userAgent": "PostmanRuntime/7.32.3",
      "createdAt": "2025-10-14T16:00:00Z",
      "lastActivity": "2025-10-14T17:00:00Z",
      "expiresAt": "2025-10-21T16:00:00Z"
    }
  ]
}
```

#### **Cerrar Sesión Actual (POST /auth/logout)**

```typescript
POST /auth/logout
Authorization: Bearer <accessToken>

// Marca isActive=false en la sesión actual
```

#### **Cerrar Todas las Sesiones (DELETE /auth/sessions/all)**

```typescript
DELETE /auth/sessions/all
Authorization: Bearer <accessToken>

// Marca isActive=false en TODAS las sesiones del usuario
```

#### **Cerrar Sesión Específica (DELETE /auth/sessions/:id)**

```typescript
DELETE /auth/sessions/15
Authorization: Bearer <accessToken>

// Marca isActive=false en la sesión ID 15
```

---

### Troubleshooting 2FA

#### **Problema: "Código 2FA inválido"**

**Causas comunes:**
1. **Desincronización de hora**: El servidor y el teléfono tienen diferente hora
2. **Secret incorrecto**: No se escaneó el QR más reciente
3. **Código expirado**: El código cambió mientras lo escribías (cada 30s)

**Soluciones:**
1. **Sincronizar hora automática** en el teléfono
2. **Regenerar el QR**: `POST /auth/2fa/generate` y escanear de nuevo
3. **Usar códigos de respaldo**: Si perdiste el teléfono
4. **Verificar ventana de tiempo**: `GET /auth/2fa/debug` muestra códigos válidos

**Ejemplo de debug:**
```typescript
GET /auth/2fa/debug
Authorization: Bearer <accessToken>

// Response
{
  "validCodes": [
    { "offset": "-30s", "code": "360181" },
    { "offset": "0s", "code": "039366", "isCurrent": true },  // <-- Código actual
    { "offset": "+30s", "code": "030301" },
    ...
  ],
  "serverTime": "2025-10-14T06:52:27.706Z"
}
```

---

## API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/auth/login` | Iniciar sesión | No |
| POST | `/auth/verify-2fa` | Verificar código 2FA | No (tempToken) |
| POST | `/auth/refresh` | Renovar access token | No (refreshToken) |
| POST | `/auth/logout` | Cerrar sesión actual | JWT |
| GET | `/auth/me` | Obtener perfil actual | JWT |
| GET | `/auth/sessions` | Ver sesiones activas | JWT |
| DELETE | `/auth/sessions/all` | Cerrar todas las sesiones | JWT |
| DELETE | `/auth/sessions/:id` | Cerrar sesión específica | JWT |

### Autenticación 2FA

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| POST | `/auth/2fa/generate` | Generar QR para 2FA | JWT |
| POST | `/auth/2fa/enable` | Habilitar 2FA | JWT |
| POST | `/auth/2fa/disable` | Deshabilitar 2FA | JWT |
| GET | `/auth/2fa/status` | Ver estado de 2FA | JWT |
| POST | `/auth/2fa/regenerate-backup-codes` | Regenerar códigos de respaldo | JWT |
| GET | `/auth/2fa/debug` | [DEBUG] Debug de TOTP (eliminar en prod) | JWT |

---

### Diagrama de Flujo Completo

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         FLUJO DE AUTENTICACIÓN                           │
└─────────────────────────────────────────────────────────────────────────┘

 Usuario                    Cliente                     Servidor
   │                          │                            │
   │  1. Ingresa credenciales │                            │
   ├─────────────────────────>│                            │
   │                          │ POST /auth/login           │
   │                          ├───────────────────────────>│
   │                          │  { email, password }       │
   │                          │                            │
   │                          │                ┌───────────▼──────────┐
   │                          │                │ Valida usuario       │
   │                          │                │ Verifica password    │
   │                          │                │ Busca en DB          │
   │                          │                └───────────┬──────────┘
   │                          │                            │
   │                          │     ┌──────────────────────▼──────────────┐
   │                          │     │ ¿Tiene 2FA habilitado?              │
   │                          │     └─┬────────────────────┬──────────────┘
   │                          │       │ NO                 │ SÍ
   │                          │       │                    │
   │                          │  ┌────▼─────┐      ┌──────▼────────┐
   │                          │  │ Genera   │      │ Genera        │
   │                          │  │ tokens   │      │ tempToken     │
   │                          │  │ finales  │      │ (5 min)       │
   │                          │  └────┬─────┘      └──────┬────────┘
   │                          │       │                    │
   │                          │<──────┴────────────────────┘
   │                          │  Response
   │<─────────────────────────┤  { requiresTwoFactor, token(s) }
   │                          │
   │ ┌────────────────────────┴─────────┐
   │ │ SI requiresTwoFactor = false     │
   │ │ - Guardar accessToken            │
   │ │ - Listo para hacer requests      │
   │ └──────────────────────────────────┘
   │
   │ ┌────────────────────────┬─────────┐
   │ │ SI requiresTwoFactor = true      │
   │ │ - Abrir app 2FA (Google Auth)    │
   │ │ - Leer código de 6 dígitos       │
   │ └──────────────────────────────────┘
   │                          │
   │  2. Ingresa código 2FA   │
   ├─────────────────────────>│
   │                          │ POST /auth/verify-2fa
   │                          ├───────────────────────────>│
   │                          │  { sessionToken, token }   │
   │                          │                            │
   │                          │                ┌───────────▼──────────┐
   │                          │                │ Verifica tempToken   │
   │                          │                │ Verifica código TOTP │
   │                          │                │ Genera tokens finales│
   │                          │                └───────────┬──────────┘
   │                          │                            │
   │                          │<───────────────────────────┘
   │                          │  { accessToken, refreshToken }
   │<─────────────────────────┤
   │                          │
   │ [OK] Autenticado         │
   │                          │
   │  3. Hacer requests       │
   │  con Authorization       │
   ├─────────────────────────>│ GET /api/resource
   │                          ├───────────────────────────>│
   │                          │  Header: Bearer <token>    │
   │                          │                            │
   │                          │                ┌───────────▼──────────┐
   │                          │                │ JwtAuthGuard         │
   │                          │                │ - Verifica JWT       │
   │                          │                │ - Busca sesión activa│
   │                          │                │ - Valida expiración  │
   │                          │                │ - Actualiza activity │
   │                          │                └───────────┬──────────┘
   │                          │                            │
   │                          │<───────────────────────────┘
   │                          │  { data }
   │<─────────────────────────┤
   │                          │
   │  4. Token expira (15min) │
   ├─────────────────────────>│ POST /auth/refresh
   │                          ├───────────────────────────>│
   │                          │  { refreshToken }          │
   │                          │                            │
   │                          │                ┌───────────▼──────────┐
   │                          │                │ Verifica refresh     │
   │                          │                │ Busca sesión válida  │
   │                          │                │ Genera nuevo access  │
   │                          │                └───────────┬──────────┘
   │                          │                            │
   │                          │<───────────────────────────┘
   │                          │  { accessToken }
   │<─────────────────────────┤
   │                          │
   │ [OK] Token renovado      │
   │                          │
```

---

## API Endpoints

### Autenticación

| Método | Endpoint | Descripción | Rol Requerido |
|--------|----------|-------------|---------------|
| POST | `/api/v1/users/admin` | Crear administrador | Super Admin |
| POST | `/api/v1/users/super-admin` | Crear super administrador | Super Admin |
| GET | `/api/v1/users` | Listar usuarios | Admin, Super Admin |
| GET | `/api/v1/users/:id` | Obtener usuario por ID | Admin, Super Admin |
| PATCH | `/api/v1/users/:id` | Actualizar usuario | Admin, Super Admin |
| DELETE | `/api/v1/users/:id` | Desactivar usuario | Super Admin |

### Adultos Mayores

| Método | Endpoint | Descripción | Rol Requerido |
|--------|----------|-------------|---------------|
| POST | `/api/v1/older-adults` | Crear ficha virtual | Admin |
| GET | `/api/v1/older-adults` | Listar adultos mayores | Admin, Enfermero |
| GET | `/api/v1/older-adults/:id` | Obtener ficha por ID | Admin, Enfermero |
| PATCH | `/api/v1/older-adults/:id` | Actualizar ficha | Admin |
| GET | `/api/v1/older-adults/:id/pdf` | Generar PDF | Admin, Enfermero |
| POST | `/api/v1/older-adults/:id/share` | Compartir con especialista | Admin |

### Citas

| Método | Endpoint | Descripción | Rol Requerido |
|--------|----------|-------------|---------------|
| POST | `/api/v1/appointments` | Programar cita | Enfermero, Fisioterapeuta |
| GET | `/api/v1/appointments` | Listar citas | Enfermero |
| GET | `/api/v1/appointments/:id` | Obtener cita por ID | Enfermero |
| PATCH | `/api/v1/appointments/:id` | Actualizar cita | Enfermero |
| POST | `/api/v1/appointments/:id/nursing` | Registrar atención enfermería | Enfermero |
| GET | `/api/v1/appointments/:id/report` | Generar reporte médico | Enfermero |

### Auditoría

| Método | Endpoint | Descripción | Rol Requerido |
|--------|----------|-------------|---------------|
| GET | `/api/v1/audit/logs` | Consultar logs | Admin, Super Admin |
| POST | `/api/v1/audit/reports` | Generar reporte de auditoría | Super Admin |
| GET | `/api/v1/audit/reports/:id` | Obtener reporte por ID | Super Admin |
| GET | `/api/v1/audit/export` | Exportar logs (CSV/PDF) | Super Admin |

### Roles

| Método | Endpoint | Descripción | Rol Requerido |
|--------|----------|-------------|---------------|
| POST | `/api/v1/roles` | Crear rol personalizado | Super Admin |
| GET | `/api/v1/roles` | Listar roles | Admin, Super Admin |
| GET | `/api/v1/roles/:id` | Obtener rol por ID | Admin, Super Admin |
| PATCH | `/api/v1/roles/:id` | Editar rol | Super Admin |
| DELETE | `/api/v1/roles/:id` | Eliminar rol | Super Admin |

### Health Check

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|---------------|
| GET | `/api/v1/health` | Estado del servicio | No |
| GET | `/api/v1/health/database` | Estado de la BD | No |

Para ver la documentación completa interactiva, visita: `http://localhost:3000/api/docs`

> **Para desarrolladores**: Consulta la [Guía Técnica del Flujo de Autenticación](./AUTHENTICATION_FLOW.md) para detalles de implementación, diagramas de arquitectura y troubleshooting avanzado.

---

## Testing

### Tests Unitarios

```bash
# Ejecutar todos los tests
npm run test

# Ejecutar tests en modo watch
npm run test:watch

# Ejecutar tests con coverage
npm run test:cov
```

### Tests E2E

```bash
# Ejecutar tests end-to-end
npm run test:e2e
```

### Estructura de Tests

```
src/
└── core/
    └── auth/
        ├── application/
        │   └── services/
        │       └── auth.service.spec.ts
        └── tests/
            └── auth.e2e-spec.ts
```

---

## Scripts Disponibles

| Script | Descripción |
|--------|-------------|
| `npm run start` | Iniciar en modo producción |
| `npm run start:dev` | Iniciar en modo desarrollo con hot-reload |
| `npm run start:debug` | Iniciar en modo debug |
| `npm run build` | Compilar proyecto TypeScript |
| `npm run format` | Formatear código con Prettier |
| `npm run lint` | Ejecutar linter ESLint |
| `npm run test` | Ejecutar tests unitarios |
| `npm run test:e2e` | Ejecutar tests end-to-end |
| `npm run test:cov` | Generar reporte de cobertura |
| `npm run migration:generate` | Generar nueva migración |
| `npm run migration:run` | Ejecutar migraciones pendientes |
| `npm run migration:revert` | Revertir última migración |

---

## Backups Automatizados

El sistema ejecuta backups automáticos diarios a las 2:00 AM (configurable en `.env`).

### Configuración Manual de Backup

```bash
# Ejecutar backup manualmente
npm run backup:create

# Restaurar desde backup
npm run backup:restore backups/backup-2025-10-11.sql
```

### Sincronización con Google Drive

1. Configurar credenciales OAuth2 en Google Cloud Console
2. Agregar variables en `.env`:
   ```env
   GOOGLE_DRIVE_CLIENT_ID=tu_client_id
   GOOGLE_DRIVE_CLIENT_SECRET=tu_client_secret
   GOOGLE_DRIVE_REFRESH_TOKEN=tu_refresh_token
   GOOGLE_DRIVE_FOLDER_ID=tu_folder_id
   ```

3. El sistema sincronizará automáticamente los backups a Google Drive

---

## Seguridad

### Medidas Implementadas

- **Autenticación JWT Multi-Token** con access token (15 min) + refresh token (7 días)
- **2FA/TOTP** (Time-based One-Time Password) con códigos de respaldo
- **Gestión de Sesiones Persistentes** con auditoría de dispositivos
- **Bcrypt** para hashing de contraseñas (10 rounds de salt)
- **Guards de Seguridad**: JwtAuthGuard, RolesGuard, TwoFactorGuard
- **Helmet.js** para headers HTTP seguros
- **Rate Limiting** (100 req/min por IP) con throttler
- **CORS** restringido a orígenes conocidos
- **Validación de datos** con class-validator y pipes
- **SQL Injection Protection** mediante TypeORM y prepared statements
- **Auditoría completa** de intentos de login y acciones críticas

> Para más detalles sobre el flujo de autenticación, consulta [Flujo de Autenticación y Seguridad](#flujo-de-autenticación-y-seguridad).

### Recomendaciones de Producción

- Cambiar `JWT_SECRET` con clave aleatoria de 256 bits
- Usar HTTPS con certificado SSL/TLS válido
- Configurar firewall (exponer solo 443/80)
- Habilitar 2FA para administradores
- Realizar backups diarios y pruebas de restauración
- Mantener dependencias actualizadas (`npm audit fix`)
- Eliminar endpoint `/auth/2fa/debug` en producción
- Configurar logs centralizados (ELK, Datadog, etc.)
- Monitorear sesiones activas y cerrar sospechosas

---

## Contribución

Las contribuciones son bienvenidas. Por favor sigue estos pasos:

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

### Estándares de Código

- Seguir las convenciones de TypeScript y NestJS
- Ejecutar `npm run lint` antes de commit
- Mantener cobertura de tests > 70%
- Documentar funciones complejas con JSDoc
- Usar nombres descriptivos para variables y funciones

---

## Roadmap

- [ ] Implementación completa de módulos especializados (Fisioterapia, Psicología)
- [ ] Dashboard analítico con gráficos
- [ ] Integración con API del TSE para validación de cédulas
- [ ] Notificaciones push en tiempo real (WebSockets)
- [ ] Aplicación móvil con React Native
- [ ] Soporte multi-idioma (i18n)
- [ ] Módulo de inventario de medicamentos
- [ ] Sistema de videollamadas para consultas remotas

---

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

## Autores

- **TonyML** - Backend Developer - Controller & Services
- **Luis** - Frontend Developer - UI & Funcionalidad
- **Jona** - Database Administrator - MySQL & Repositorio

---

## Contacto

Para consultas o soporte, contactar a:

- Email: soporte@hogar-ancianos.com
- Issues: [GitHub Issues](https://github.com/tu-usuario/backend_nest_js_hogar_de_ancianos/issues)

---

## Agradecimientos

- Universidad de Costa Rica (UCR) - Análisis de Sistemas 2025
- NestJS Community
- TypeORM Contributors

---

Desarrollado con TypeScript y NestJS