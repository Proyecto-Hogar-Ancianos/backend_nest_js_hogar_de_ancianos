# 🔐 Guía Técnica del Flujo de Autenticación

> Documentación técnica detallada del sistema de autenticación del Backend Hogar de Ancianos

---

## Índice

1. [Arquitectura General](#arquitectura-general)
2. [Entidades y Base de Datos](#entidades-y-base-de-datos)
3. [Servicios y Lógica de Negocio](#servicios-y-lógica-de-negocio)
4. [Guards y Estrategias](#guards-y-estrategias)
5. [Flujos Detallados](#flujos-detallados)
6. [Configuración](#configuración)
7. [Testing](#testing)
8. [Troubleshooting](#troubleshooting)

---

## Arquitectura General

### Componentes del Sistema de Autenticación

```
┌─────────────────────────────────────────────────────────────┐
│                    AUTH MODULE                               │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  APPLICATION LAYER                                           │
│  ├── AuthService           → Login, logout, tokens          │
│  ├── TwoFactorService      → 2FA/TOTP generation & verify   │
│  └── JwtStrategy           → Passport strategy              │
│                                                              │
│  DOMAIN LAYER                                                │
│  ├── UserSession           → Sesiones persistentes          │
│  ├── UserTwoFactor         → Configuración 2FA              │
│  └── LoginAttempt          → Auditoría de intentos          │
│                                                              │
│  INFRASTRUCTURE LAYER                                        │
│  ├── AuthController        → Endpoints REST                 │
│  ├── JwtAuthGuard          → Protección de rutas            │
│  ├── RolesGuard            → Control de acceso RBAC         │
│  └── DTOs                  → Validación de entrada          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Dependencias Clave

```json
{
  "@nestjs/jwt": "^11.0.1",
  "@nestjs/passport": "^11.0.5",
  "passport": "^0.7.0",
  "passport-jwt": "^4.0.1",
  "bcrypt": "^6.0.0",
  "speakeasy": "^2.0.0",
  "qrcode": "^1.5.4"
}
```

---

## Entidades y Base de Datos

### 1. **UserSession** - Gestión de Sesiones

```typescript
// src/core/auth/domain/entities/user-session.entity.ts

@Entity('user_sessions')
export class UserSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'session_token', unique: true, length: 500 })
  sessionToken: string;  // SHA-256 hash del access token

  @Column({ name: 'refresh_token', length: 500, nullable: true })
  refreshToken: string;  // SHA-256 hash del refresh token

  @Column({ name: 'ip_address', length: 45, nullable: true })
  ipAddress: string;

  @Column({ name: 'user_agent', type: 'text', nullable: true })
  userAgent: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;

  @Column({ name: 'expires_at', type: 'datetime' })
  expiresAt: Date;  // +7 días desde creación

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'last_activity', type: 'datetime' })
  lastActivity: Date;  // Actualizado en cada request

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
```

**Propósito:**
- Almacenar sesiones activas con información de contexto
- Permitir invalidación remota de sesiones
- Auditoría de dispositivos activos
- Renovación de tokens sin re-login

---

### 2. **UserTwoFactor** - Configuración 2FA

```typescript
// src/core/auth/domain/entities/user-two-factor.entity.ts

@Entity('user_two_factor')
export class UserTwoFactor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'tfa_secret' })
  tfaSecret: string;  // Secret TOTP en base32 (32 caracteres)

  @Column({ name: 'tfa_enabled', default: false })
  tfaEnabled: boolean;  // Se activa después de verificar

  @Column({ name: 'tfa_backup_codes', type: 'text', nullable: true })
  tfaBackupCodes: string;  // JSON: ["8303C8A4", "A670337A", ...]

  @Column({ name: 'tfa_last_used', type: 'datetime', nullable: true })
  tfaLastUsed: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
```

**Propósito:**
- Almacenar secret TOTP compartido con la app del usuario
- Códigos de respaldo para recuperación
- Auditoría de uso de 2FA

---

### 3. **LoginAttempt** - Auditoría de Intentos

```typescript
// src/core/auth/domain/entities/login-attempt.entity.ts

@Entity('login_attempts')
export class LoginAttempt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', nullable: true })
  userId: number;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'ip_address', length: 45, nullable: true })
  ipAddress: string;

  @Column({ name: 'attempt_successful', default: false })
  attemptSuccessful: boolean;

  @Column({ name: 'failure_reason', length: 100, nullable: true })
  failureReason: string;
  // Valores: 'user_not_found', 'invalid_password', 'user_inactive',
  //          'requires_2fa', 'invalid_2fa'

  @CreateDateColumn({ name: 'attempted_at' })
  attemptedAt: Date;

  @ManyToOne(() => User, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
```

**Propósito:**
- Detección de intentos de acceso no autorizado
- Análisis de seguridad y forense
- Estadísticas de login

---

## Servicios y Lógica de Negocio

### **AuthService** - Servicio Principal

#### Método: `login()`

```typescript
async login(
  email: string,
  password: string,
  ipAddress?: string,
  userAgent?: string,
): Promise<LoginResponse>
```

**Flujo:**
1. Busca usuario por email (`userRepository.findOne`)
2. Crea registro en `LoginAttempt` (inicialmente `attemptSuccessful: false`)
3. Valida que el usuario exista → Si no: `UnauthorizedException`
4. Valida que esté activo (`isActive: true`) → Si no: `UnauthorizedException`
5. Compara contraseña con bcrypt → Si no: `UnauthorizedException`
6. Verifica si tiene 2FA habilitado:
   - **SIN 2FA**: Genera tokens finales, crea sesión, retorna
   - **CON 2FA**: Genera `tempToken` (válido 5 min), retorna

**Response:**
```typescript
interface LoginResponse {
  requiresTwoFactor: boolean;
  tempToken?: string;          // Si tiene 2FA
  accessToken?: string;        // Si NO tiene 2FA
  refreshToken?: string;
  user?: {
    id: number;
    email: string;
    name: string;
    roleId?: number;
  };
}
```

---

#### Método: `verifyTwoFactorAndLogin()`

```typescript
async verifyTwoFactorAndLogin(
  tempToken: string,
  tfaToken: string,
  ipAddress?: string,
  userAgent?: string,
): Promise<LoginResponse>
```

**Flujo:**
1. Verifica `tempToken` con JWT
2. Valida que tenga `require2FA: true` en el payload
3. Busca usuario por `payload.sub`
4. Llama a `twoFactorService.verifyTwoFactorToken(userId, tfaToken)`
5. Registra intento en `LoginAttempt`
6. Si el código es válido:
   - Genera `accessToken` + `refreshToken`
   - Crea sesión persistente en `user_sessions`
   - Retorna tokens

**Códigos TOTP válidos:**
- Código de 6 dígitos de la app (Google Authenticator, 2FAS, etc.)
- Código de respaldo de 8 caracteres hexadecimales

---

#### Método: `generateTokens()`

```typescript
private async generateTokens(
  user: User,
  ipAddress?: string,
  userAgent?: string,
): Promise<{ accessToken: string; refreshToken: string }>
```

**Flujo:**
1. Crea payload JWT:
   ```typescript
   {
     sub: user.id,
     email: user.email,
     roleId: user.roleId
   }
   ```
2. Genera `accessToken` (15 min)
3. Genera `refreshToken` (7 días)
4. Calcula hashes SHA-256 de ambos tokens
5. Guarda sesión en `user_sessions`:
   ```typescript
   {
     userId: user.id,
     sessionToken: sha256(accessToken),
     refreshToken: sha256(refreshToken),
     ipAddress,
     userAgent,
     isActive: true,
     expiresAt: now + 7 días
   }
   ```

**¿Por qué SHA-256?**
- No almacenamos tokens en texto plano (seguridad)
- Podemos buscar sesiones por hash del token
- Si la DB se compromete, los tokens no son reutilizables

---

#### Método: `refreshToken()`

```typescript
async refreshToken(refreshToken: string): Promise<{ accessToken: string }>
```

**Flujo:**
1. Verifica `refreshToken` con JWT
2. Calcula `sha256(refreshToken)`
3. Busca sesión activa con ese hash
4. Valida que no haya expirado (`expiresAt > now`)
5. Genera nuevo `accessToken` (15 min)
6. Actualiza `lastActivity` de la sesión

**¿Por qué no genera nuevo refreshToken?**
- El refresh token tiene vida de 7 días
- Solo se renueva en login completo
- Simplifica la gestión de sesiones

---

### **TwoFactorService** - Gestión de 2FA

#### Método: `generateTwoFactorSecret()`

```typescript
async generateTwoFactorSecret(
  userId: number,
  userEmail: string
): Promise<{
  secret: string;
  qrCodeUrl: string;
  backupCodes: string[];
}>
```

**Flujo:**
1. Genera secret TOTP con `speakeasy`:
   ```typescript
   const secret = speakeasy.generateSecret({
     name: `Hogar de Ancianos (${userEmail})`,
     issuer: 'Hogar de Ancianos',
     length: 20  // 20 bytes = 32 caracteres base32
   });
   ```
2. Genera 10 códigos de respaldo (8 caracteres hex cada uno)
3. Guarda en `user_two_factor` con `tfaEnabled: false`
4. Genera QR code en base64 con `qrcode.toDataURL(secret.otpauth_url)`
5. Retorna secret, QR y códigos

**Formato del QR (otpauth://):**
```
otpauth://totp/Hogar%20de%20Ancianos%20(admin@hogar.com)?secret=K5SGG3SRO5KG4PSQG4ZXIZCTIE4E6V3W&issuer=Hogar%20de%20Ancianos
```

---

#### Método: `verifyTwoFactorToken()`

```typescript
async verifyTwoFactorToken(userId: number, token: string): Promise<boolean>
```

**Flujo:**
1. Busca registro 2FA del usuario
2. Limpia el token: `token.replace(/[\s-]/g, '')`
3. Verifica formato:

   **a) Código de respaldo (8 hex):**
   ```typescript
   if (cleanToken.length === 8 && /^[0-9A-F]+$/i.test(cleanToken)) {
     // Buscar en backupCodes (JSON)
     // Si existe: eliminar, guardar, return true
   }
   ```

   **b) Código TOTP (6 dígitos):**
   ```typescript
   if (cleanToken.length === 6 && /^\d{6}$/.test(cleanToken)) {
     const verified = speakeasy.totp.verify({
       secret: tfaSecret,
       encoding: 'base32',
       token: cleanToken,
       window: 10  // ±5 minutos (10 períodos de 30s)
     });
     return verified;
   }
   ```

**Algoritmo TOTP (RFC 6238):**
```
TOTP = TRUNCATE(HMAC-SHA1(K, T))

Donde:
- K = Secret compartido (base32)
- T = floor(Unix_Time / 30)  // Período de 30 segundos
- TRUNCATE = Toma 6 dígitos del hash
```

**Ventana de tiempo (`window: 10`):**
- Permite códigos en el rango: `[T-10, T+10]`
- Equivale a: `[-5 minutos, +5 minutos]`
- Tolerante a desincronización de reloj

---

## Guards y Estrategias

### **JwtAuthGuard** - Protección de Rutas

```typescript
// src/common/guards/jwt-auth.guard.ts

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Verificar si la ruta es pública (@Public())
    const isPublic = this.reflector.get('isPublic', context.getHandler());
    if (isPublic) return true;

    // 2. Extraer token del header Authorization
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    // 3. Verificar JWT (firma + expiración)
    const payload = this.jwtService.verify(token);

    // 4. Rechazar tokens temporales de 2FA
    if (payload.require2FA) {
      throw new UnauthorizedException('Token temporal no válido');
    }

    // 5. Buscar sesión activa por hash
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const session = await this.sessionRepository.findOne({
      where: { sessionToken: tokenHash, isActive: true }
    });

    // 6. Validar sesión
    if (!session || new Date() > session.expiresAt) {
      throw new UnauthorizedException('Sesión inválida o expirada');
    }

    // 7. Actualizar última actividad
    session.lastActivity = new Date();
    await this.sessionRepository.save(session);

    // 8. Inyectar usuario en request
    request.user = payload;
    return true;
  }
}
```

**Uso en controllers:**
```typescript
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Get('protected-route')
async protectedRoute(@CurrentUser() user: any) {
  return { message: 'Acceso permitido', user };
}
```

---

### **JwtStrategy** - Estrategia Passport

```typescript
// src/core/auth/application/strategies/jwt.strategy.ts

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload) {
    // Rechazar tokens temporales de 2FA
    if (payload.require2FA) {
      throw new UnauthorizedException('Token temporal no válido');
    }

    // Buscar usuario activo
    const user = await this.userRepository.findOne({
      where: { id: payload.sub, isActive: true },
      relations: ['role'],
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Retorna objeto que se inyecta en request.user
    return {
      userId: user.id,
      email: user.email,
      roleId: user.roleId,
      role: user.role,
    };
  }
}
```

---

### **RolesGuard** - Control de Acceso RBAC

```typescript
// src/common/guards/roles.guard.ts

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true;  // Si no hay roles requeridos, permitir
    }

    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some(role => user.role?.id === role);
  }
}
```

**Uso:**
```typescript
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.SuperAdmin, Role.Admin)
@Get('admin-only')
async adminRoute() {
  return { message: 'Solo admins' };
}
```

---

## Flujos Detallados

### Flujo 1: Login SIN 2FA

```
POST /auth/login
{ "email": "user@hogar.com", "password": "Pass123!" }

┌─────────────────────────────────────────────────────────┐
│ AuthController.login()                                   │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│ AuthService.login()                                      │
├─────────────────────────────────────────────────────────┤
│ 1. userRepository.findOne({ email })                    │
│ 2. loginAttemptRepository.create({ email, ... })        │
│ 3. Validar usuario existe y está activo                 │
│ 4. bcrypt.compare(password, user.password)              │
│ 5. twoFactorService.isTwoFactorEnabled(user.id)         │
│    └─> false                                             │
│ 6. generateTokens(user, ip, userAgent)                  │
│    ├─> accessToken (15 min)                             │
│    ├─> refreshToken (7 días)                            │
│    └─> sessionRepository.save({ ... })                  │
│ 7. loginAttempt.attemptSuccessful = true                │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│ Response:                                                │
│ {                                                        │
│   "requiresTwoFactor": false,                           │
│   "accessToken": "eyJhbG...",                           │
│   "refreshToken": "eyJhbG...",                          │
│   "user": { "id": 1, "email": "...", ... }             │
│ }                                                        │
└─────────────────────────────────────────────────────────┘
```

---

### Flujo 2: Login CON 2FA

```
POST /auth/login
{ "email": "admin@hogar.com", "password": "Secure123!" }

┌─────────────────────────────────────────────────────────┐
│ AuthService.login()                                      │
├─────────────────────────────────────────────────────────┤
│ 1-4. [Mismo que flujo anterior]                         │
│ 5. twoFactorService.isTwoFactorEnabled(user.id)         │
│    └─> true                                              │
│ 6. generateTempToken(user)                              │
│    └─> JWT con { sub, email, require2FA: true }         │
│       Expiración: 5 minutos                             │
│ 7. loginAttempt.failureReason = 'requires_2fa'          │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│ Response:                                                │
│ {                                                        │
│   "requiresTwoFactor": true,                            │
│   "tempToken": "eyJhbGciOiJI..."                        │
│ }                                                        │
└─────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│ Usuario abre app 2FA (Google Authenticator)             │
│ Lee código de 6 dígitos: "123456"                       │
└─────────────────────────────────────────────────────────┘
             │
             ▼
POST /auth/verify-2fa
{ "sessionToken": "eyJ...", "token": "123456" }

┌─────────────────────────────────────────────────────────┐
│ AuthService.verifyTwoFactorAndLogin()                   │
├─────────────────────────────────────────────────────────┤
│ 1. jwtService.verify(tempToken)                         │
│ 2. Validar payload.require2FA === true                  │
│ 3. userRepository.findOne({ id: payload.sub })          │
│ 4. twoFactorService.verifyTwoFactorToken(id, "123456") │
│    ├─> speakeasy.totp.verify({ secret, token, ... })   │
│    └─> true ✅                                          │
│ 5. loginAttemptRepository.create({ successful: true })  │
│ 6. generateTokens(user, ip, userAgent)                  │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│ Response:                                                │
│ {                                                        │
│   "requiresTwoFactor": false,                           │
│   "accessToken": "eyJhbG...",                           │
│   "refreshToken": "eyJhbG...",                          │
│   "user": { "id": 1, ... }                             │
│ }                                                        │
└─────────────────────────────────────────────────────────┘
```

---

### Flujo 3: Request con Token

```
GET /auth/me
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

┌─────────────────────────────────────────────────────────┐
│ JwtAuthGuard.canActivate()                              │
├─────────────────────────────────────────────────────────┤
│ 1. Extraer token del header                             │
│ 2. jwtService.verify(token)                             │
│    └─> payload: { sub: 1, email: "...", roleId: 2 }    │
│ 3. Validar payload.require2FA !== true                  │
│ 4. sha256(token) = "abc123..."                          │
│ 5. sessionRepository.findOne({                          │
│      sessionToken: "abc123...",                         │
│      isActive: true                                      │
│    })                                                    │
│ 6. Validar session.expiresAt > now                      │
│ 7. session.lastActivity = now                           │
│ 8. sessionRepository.save(session)                      │
│ 9. request.user = payload                               │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│ AuthController.getProfile(@CurrentUser() user)          │
└────────────┬────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────┐
│ Response: { user }                                       │
└─────────────────────────────────────────────────────────┘
```

---

## Configuración

### Variables de Entorno

```bash
# .env
JWT_SECRET=your-super-secret-key-change-in-production-256-bits
JWT_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_db_password
DB_DATABASE=hogar_ancianos
```

### Módulo de Configuración JWT

```typescript
// src/core/auth/auth.module.ts

JwtModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (configService: ConfigService) => ({
    secret: configService.get<string>('JWT_SECRET') || 'default-secret',
    signOptions: {
      expiresIn: '15m',
    },
  }),
})
```

---

## Testing

### Test Unitario: AuthService.login()

```typescript
// src/core/auth/tests/auth.service.spec.ts

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: MockType<Repository<User>>;
  let sessionRepository: MockType<Repository<UserSession>>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
        { provide: getRepositoryToken(UserSession), useValue: mockRepository },
        // ...
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('login', () => {
    it('should return tokens when credentials are valid and 2FA is disabled', async () => {
      const mockUser = {
        id: 1,
        email: 'test@hogar.com',
        password: await bcrypt.hash('password123', 10),
        isActive: true,
      };

      userRepository.findOne.mockResolvedValue(mockUser);
      twoFactorService.isTwoFactorEnabled.mockResolvedValue(false);

      const result = await service.login('test@hogar.com', 'password123');

      expect(result.requiresTwoFactor).toBe(false);
      expect(result.accessToken).toBeDefined();
      expect(result.refreshToken).toBeDefined();
    });

    it('should return tempToken when 2FA is enabled', async () => {
      const mockUser = { id: 1, email: 'test@hogar.com', isActive: true };

      userRepository.findOne.mockResolvedValue(mockUser);
      twoFactorService.isTwoFactorEnabled.mockResolvedValue(true);

      const result = await service.login('test@hogar.com', 'password123');

      expect(result.requiresTwoFactor).toBe(true);
      expect(result.tempToken).toBeDefined();
      expect(result.accessToken).toBeUndefined();
    });
  });
});
```

### Test E2E: Login Flow

```typescript
// test/auth.e2e-spec.ts

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/auth/login (POST)', () => {
    it('should login successfully without 2FA', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'admin@hogar.com',
          password: 'Admin123!',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.requiresTwoFactor).toBe(false);
          expect(res.body.accessToken).toBeDefined();
        });
    });

    it('should require 2FA when enabled', () => {
      return request(app.getHttpServer())
        .post('/auth/login')
        .send({
          email: 'superadmin@hogar.com',
          password: 'SuperAdmin123!',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.requiresTwoFactor).toBe(true);
          expect(res.body.tempToken).toBeDefined();
        });
    });
  });
});
```

---

## Troubleshooting

### Problema 1: "Código 2FA inválido"

**Síntomas:**
```json
{
  "statusCode": 401,
  "message": "Código 2FA inválido"
}
```

**Diagnóstico:**
1. Verificar sincronización de hora:
   ```bash
   # En el servidor
   timedatectl status
   
   # En el teléfono
   Configuración → Fecha y hora → Automático ✅
   ```

2. Usar endpoint de debug:
   ```bash
   GET /auth/2fa/debug
   Authorization: Bearer <token>
   ```

3. Verificar que el secret sea el correcto:
   - Regenerar: `POST /auth/2fa/generate`
   - Escanear nuevo QR
   - Probar código inmediatamente

**Solución:**
```typescript
// Aumentar ventana de tolerancia (temporalmente para debug)
speakeasy.totp.verify({
  secret: tfaSecret,
  encoding: 'base32',
  token: cleanToken,
  window: 20,  // ±10 minutos
});
```

---

### Problema 2: "Sesión no encontrada o inválida"

**Síntomas:**
```json
{
  "statusCode": 401,
  "message": "Sesión no encontrada o inválida"
}
```

**Diagnóstico:**
```sql
-- Ver sesiones del usuario
SELECT * FROM user_sessions 
WHERE user_id = 1 
ORDER BY last_activity DESC;

-- Ver si el token está hasheado correctamente
SELECT 
  id, 
  SUBSTRING(session_token, 1, 10) as token_hash,
  is_active,
  expires_at
FROM user_sessions 
WHERE user_id = 1;
```

**Posibles causas:**
1. Token no está en la DB (sesión cerrada)
2. `isActive = false` (logout ejecutado)
3. `expiresAt < now` (sesión expirada)
4. Hash SHA-256 no coincide

**Solución:**
```bash
# Hacer login de nuevo
POST /auth/login

# O renovar con refresh token
POST /auth/refresh
{ "refreshToken": "..." }
```

---

### Problema 3: "Token temporal no válido"

**Síntomas:**
```json
{
  "statusCode": 401,
  "message": "Token temporal no válido para acceso"
}
```

**Causa:**
Estás intentando usar un `tempToken` (generado durante login con 2FA) en lugar del `accessToken` final.

**Solución:**
Completar el flujo 2FA:
```bash
POST /auth/verify-2fa
{
  "sessionToken": "<tempToken>",
  "token": "123456"
}

# Obtendrás el accessToken final
```

---

## Mejores Prácticas

### Seguridad

1. **Rotar JWT_SECRET periódicamente**
   ```bash
   # Generar nueva clave
   openssl rand -base64 64
   ```

2. **Implementar rate limiting**
   ```typescript
   @UseGuards(ThrottlerGuard)
   @Throttle(5, 60)  // 5 requests por minuto
   @Post('login')
   async login() { ... }
   ```

3. **Habilitar 2FA para administradores**
   ```sql
   UPDATE user_two_factor 
   SET tfa_enabled = 1 
   WHERE user_id IN (
     SELECT id FROM users WHERE role_id IN (1, 2)
   );
   ```

### Performance

1. **Cachear sesiones activas**
   ```typescript
   // Usar Redis para sesiones
   @Injectable()
   export class SessionCacheService {
     constructor(@InjectRedis() private redis: Redis) {}
     
     async getSession(tokenHash: string): Promise<UserSession | null> {
       const cached = await this.redis.get(`session:${tokenHash}`);
       if (cached) return JSON.parse(cached);
       
       const session = await this.sessionRepository.findOne({ ... });
       await this.redis.setex(`session:${tokenHash}`, 900, JSON.stringify(session));
       return session;
     }
   }
   ```

2. **Limitar sesiones activas por usuario**
   ```typescript
   async login(...) {
     // ...
     const activeSessions = await this.getActiveSessions(user.id);
     if (activeSessions.length >= 5) {
       // Cerrar sesión más antigua
       await this.logoutSession(activeSessions[0].id, user.id);
     }
     // ...
   }
   ```

---

## Referencias

- [RFC 6238 - TOTP](https://datatracker.ietf.org/doc/html/rfc6238)
- [RFC 7519 - JWT](https://datatracker.ietf.org/doc/html/rfc7519)
- [NestJS Authentication](https://docs.nestjs.com/security/authentication)
- [Passport.js](http://www.passportjs.org/)
- [Speakeasy Documentation](https://github.com/speakeasyjs/speakeasy)

---

**Última actualización:** 14 de octubre de 2025  
**Versión del sistema:** 1.0.0  
**Autores:** TonyML, Luis, Jona
