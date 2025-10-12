# Copilot Instructions for AI Coding Agents

## Project Overview
This is a backend system for a retirement home, built with NestJS (TypeScript), MySQL, and Docker. It implements Clean Architecture with strong separation of concerns and domain-driven design. The system manages residents, medical records, appointments, audits, notifications, backups, and access control.

## Architecture & Structure
- **Layered Structure:**
  - `domain/`: Entities, interfaces, value objects
  - `application/`: Use-cases, business logic, services
  - `infrastructure/`: Controllers, DTOs, repositories
- **Modules:** Each domain (auth, users, roles, older-adults, medical-records, appointments, programs, audit, notifications, backups, access-control) is a self-contained module with the above layers.
- **Shared Resources:**
  - `common/`: Guards, decorators, pipes, interceptors, filters, enums, utils
  - `config/`: Centralized configuration for DB, JWT, email, Swagger
  - `shared/`: Database, logger, health checks

## Key Patterns & Conventions
- **Repository Pattern** for data access
- **Dependency Injection** via NestJS IoC
- **Strategy Pattern** for authentication
- **Factory Pattern** for PDF generation
- **Observer Pattern** for audit logging (interceptors)
- **DTOs** for all controller inputs/outputs
- **Use-cases** encapsulate business logic, not controllers
- **Guards/Decorators** enforce RBAC and authentication
- **2FA** via Speakeasy, enabled at `/api/v1/auth/2fa/enable`
- **Swagger** auto-generated at `/api/docs`

## Developer Workflows
- **Install:** `npm install`
- **Run (dev):** `npm run start:dev`
- **Run (prod):** `npm run build && npm run start:prod`
- **Docker:** `docker-compose up -d`
- **Migrations:** `npm run migration:run`
- **Tests:** `npm run test` (unit), `npm run test:e2e` (integration)
- **Backups:** Automated to Google Drive (see `scripts/backup-to-drive.sh`)

## Integration Points
- **Email:** Nodemailer, configured in `config/email.config.ts`
- **PDFs:** PDFKit, see `common/utils/pdf-generator.util.ts`
- **Audit Logging:** Interceptors in `common/interceptors/audit.interceptor.ts`
- **Health Checks:** `shared/health/health.controller.ts`
- **Database:** TypeORM, config in `config/database.config.ts`

## Project-Specific Notes
- **RBAC:** Roles are defined in `common/enums/roles.enum.ts` and enforced via guards/decorators
- **All business logic is in use-cases/services, not controllers**
- **DTOs must be used for all API inputs/outputs**
- **Backups:** Daily, configurable folder via env var `GOOGLE_DRIVE_FOLDER_ID`
- **Testing:** Use Jest and Supertest; see `test/` and `core/*/tests/`

## Examples
- To add a new domain, follow the module structure: create `application/`, `domain/`, `infrastructure/` folders
- To add a new API endpoint, create a DTO, update the controller, and implement logic in a use-case/service
- For new guards/decorators, place them in `common/guards/` or `common/decorators/`

---
For questions or unclear conventions, review `README.md` and module folder structures. Ask for feedback if any pattern is ambiguous or undocumented.
