# Sistema de Autenticación con 2FA - Guía Completa

## 📋 Índice
1. [Configuración Inicial](#configuración-inicial)
2. [Estructura de Base de Datos](#estructura-de-base-de-datos)
3. [Instalación de Dependencias](#instalación-de-dependencias)
4. [Variables de Entorno](#variables-de-entorno)
5. [Guía de Pruebas con Postman](#guía-de-pruebas-con-postman)
6. [Integración con 2FAS](#integración-con-2fas)
7. [Flujos de Autenticación](#flujos-de-autenticación)

---

## 🚀 Configuración Inicial

### 1. Base de Datos
Ejecuta el script SQL para crear las tablas de autenticación:

```bash
mysql -u root -p < database/auth-tables.sql
```

O desde MySQL Workbench/phpMyAdmin, ejecuta el contenido del archivo `database/auth-tables.sql`

**Tablas creadas:**
- `user_two_factor` - Configuración de 2FA por usuario
- `user_sessions` - Gestión de sesiones JWT
- `login_attempts` - Auditoría de intentos de login
- `password_reset_tokens` - Tokens para recuperación de contraseña
- `email_verification_tokens` - Tokens para verificación de email

---

## 📦 Instalación de Dependencias

Las dependencias ya están en el `package.json`. Si necesitas reinstalar:

```bash
npm install
```

**Dependencias principales para autenticación:**
- `@nestjs/jwt` - Manejo de JWT
- `@nestjs/passport` - Autenticación
- `passport-jwt` - Estrategia JWT
- `speakeasy` - Generación de tokens TOTP
- `qrcode` - Generación de códigos QR
- `bcrypt` - Hash de contraseñas

---

## ⚙️ Variables de Entorno

Crea/actualiza tu archivo `.env` con:

```env
# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_password
DB_DATABASE=hogar_de_ancianos

# JWT
JWT_SECRET=tu_clave_secreta_super_segura_cambiar_en_produccion_2024
JWT_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# Application
PORT=3000
NODE_ENV=development
```

---

## 🧪 Guía de Pruebas con Postman

### Colección de Endpoints

#### Base URL
```
http://localhost:3000
```

---

### 1️⃣ **LOGIN SIN 2FA**

**Endpoint:** `POST /auth/login`

**Headers:**
```json
Content-Type: application/json
```

**Body:**
```json
{
  "email": "usuario@example.com",
  "password": "Password123!"
}
```

**Respuesta Exitosa (sin 2FA):**
```json
{
  "requiresTwoFactor": false,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "usuario@example.com",
    "name": "Juan Pérez",
    "roleId": 2
  }
}
```

**Respuesta si tiene 2FA habilitado:**
```json
{
  "requiresTwoFactor": true,
  "tempToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 2️⃣ **OBTENER INFORMACIÓN DEL USUARIO AUTENTICADO**

**Endpoint:** `GET /auth/me`

**Headers:**
```json
Authorization: Bearer {accessToken}
```

**Respuesta:**
```json
{
  "sub": 1,
  "email": "usuario@example.com",
  "roleId": 2
}
```

---

### 3️⃣ **CONFIGURAR 2FA - GENERAR QR**

**Endpoint:** `POST /auth/2fa/generate`

**Headers:**
```json
Authorization: Bearer {accessToken}
```

**Respuesta:**
```json
{
  "message": "Escanea el código QR con tu app 2FAS",
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "secret": "JBSWY3DPEHPK3PXP",
  "backupCodes": [
    "A1B2C3D4",
    "E5F6G7H8",
    "I9J0K1L2",
    "M3N4O5P6",
    "Q7R8S9T0",
    "U1V2W3X4",
    "Y5Z6A7B8",
    "C9D0E1F2",
    "G3H4I5J6",
    "K7L8M9N0"
  ],
  "instructions": [
    "1. Abre la aplicación 2FAS en tu móvil",
    "2. Presiona el botón \"+\" para añadir una cuenta",
    "3. Selecciona \"Escanear código QR\"",
    "4. Escanea el código QR mostrado arriba",
    "5. Guarda los códigos de respaldo en un lugar seguro",
    "6. Verifica el código generado en el siguiente paso"
  ]
}
```

**Pasos en la app 2FAS:**
1. Abre 2FAS en tu móvil
2. Toca el botón "+" (añadir servicio)
3. Selecciona "Escanear QR"
4. Escanea el código QR de la respuesta
5. La app mostrará un código de 6 dígitos que cambia cada 30 segundos

---

### 4️⃣ **HABILITAR 2FA - VERIFICAR CÓDIGO**

**Endpoint:** `POST /auth/2fa/enable`

**Headers:**
```json
Authorization: Bearer {accessToken}
Content-Type: application/json
```

**Body:**
```json
{
  "token": "123456"
}
```

> **Nota:** El `token` es el código de 6 dígitos que muestra la app 2FAS

**Respuesta Exitosa:**
```json
{
  "success": true,
  "message": "2FA habilitado exitosamente. Ahora tu cuenta está más segura."
}
```

**Respuesta con código inválido:**
```json
{
  "success": false,
  "message": "Código de verificación inválido"
}
```

---

### 5️⃣ **LOGIN CON 2FA**

Después de habilitar 2FA, el login es un proceso de dos pasos:

#### Paso 1: Login inicial
**Endpoint:** `POST /auth/login`

**Body:**
```json
{
  "email": "usuario@example.com",
  "password": "Password123!"
}
```

**Respuesta:**
```json
{
  "requiresTwoFactor": true,
  "tempToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Paso 2: Verificar código 2FA
**Endpoint:** `POST /auth/verify-2fa`

**Body:**
```json
{
  "sessionToken": "{tempToken del paso anterior}",
  "token": "123456"
}
```

> **Nota:** El `token` es el código actual de 6 dígitos de la app 2FAS

**Respuesta Exitosa:**
```json
{
  "requiresTwoFactor": false,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "usuario@example.com",
    "name": "Juan Pérez",
    "roleId": 2
  }
}
```

---

### 6️⃣ **VERIFICAR ESTADO DE 2FA**

**Endpoint:** `GET /auth/2fa/status`

**Headers:**
```json
Authorization: Bearer {accessToken}
```

**Respuesta:**
```json
{
  "enabled": true,
  "lastUsed": "2024-10-13T10:30:00.000Z",
  "hasBackupCodes": true
}
```

---

### 7️⃣ **REGENERAR CÓDIGOS DE RESPALDO**

**Endpoint:** `POST /auth/2fa/regenerate-backup-codes`

**Headers:**
```json
Authorization: Bearer {accessToken}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Códigos de respaldo regenerados. Guárdalos en un lugar seguro.",
  "backupCodes": [
    "N1O2P3Q4",
    "R5S6T7U8",
    "V9W0X1Y2",
    "Z3A4B5C6",
    "D7E8F9G0",
    "H1I2J3K4",
    "L5M6N7O8",
    "P9Q0R1S2",
    "T3U4V5W6",
    "X7Y8Z9A0"
  ]
}
```

---

### 8️⃣ **DESHABILITAR 2FA**

**Endpoint:** `POST /auth/2fa/disable`

**Headers:**
```json
Authorization: Bearer {accessToken}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "2FA deshabilitado. Tu cuenta es menos segura ahora."
}
```

---

### 9️⃣ **RENOVAR TOKEN (REFRESH)**

**Endpoint:** `POST /auth/refresh`

**Body:**
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Respuesta:**
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### 🔟 **LOGOUT**

**Endpoint:** `POST /auth/logout`

**Headers:**
```json
Authorization: Bearer {accessToken}
```

**Respuesta:**
```json
{
  "message": "Sesión cerrada exitosamente"
}
```

---

### 1️⃣1️⃣ **VER SESIONES ACTIVAS**

**Endpoint:** `GET /auth/sessions`

**Headers:**
```json
Authorization: Bearer {accessToken}
```

**Respuesta:**
```json
{
  "sessions": [
    {
      "id": 1,
      "ipAddress": "192.168.1.100",
      "userAgent": "PostmanRuntime/7.32.3",
      "createdAt": "2024-10-13T10:00:00.000Z",
      "lastActivity": "2024-10-13T10:30:00.000Z",
      "expiresAt": "2024-10-20T10:00:00.000Z"
    },
    {
      "id": 2,
      "ipAddress": "192.168.1.101",
      "userAgent": "Mozilla/5.0...",
      "createdAt": "2024-10-13T09:00:00.000Z",
      "lastActivity": "2024-10-13T09:45:00.000Z",
      "expiresAt": "2024-10-20T09:00:00.000Z"
    }
  ]
}
```

---

### 1️⃣2️⃣ **CERRAR TODAS LAS SESIONES**

**Endpoint:** `DELETE /auth/sessions/all`

**Headers:**
```json
Authorization: Bearer {accessToken}
```

**Respuesta:**
```json
{
  "success": true,
  "message": "Todas las sesiones han sido cerradas"
}
```

---

### 1️⃣3️⃣ **CERRAR UNA SESIÓN ESPECÍFICA**

**Endpoint:** `DELETE /auth/sessions/{sessionId}`

**Headers:**
```json
Authorization: Bearer {accessToken}
```

**Ejemplo:** `DELETE /auth/sessions/2`

**Respuesta:**
```json
{
  "success": true,
  "message": "Sesión cerrada exitosamente"
}
```

---

## 📱 Integración con 2FAS

### ¿Qué es 2FAS?
2FAS es una aplicación móvil gratuita y de código abierto para autenticación de dos factores (TOTP - Time-based One-Time Password).

### Instalación
- **Android:** [Google Play Store](https://play.google.com/store/apps/details?id=com.twofasapp)
- **iOS:** [App Store](https://apps.apple.com/app/2fas-auth/id1217793794)

### Configuración
1. Descarga e instala 2FAS en tu móvil
2. Abre la aplicación
3. En Postman, llama al endpoint `POST /auth/2fa/generate`
4. Copia el `qrCode` (base64) y visualízalo en un navegador o usa una herramienta online
5. En 2FAS, toca "+" → "Escanear QR"
6. Escanea el código QR generado
7. La app mostrará "Hogar de Ancianos" con un código de 6 dígitos
8. Usa ese código en el endpoint `POST /auth/2fa/enable`

### Uso de Códigos de Respaldo
Los códigos de respaldo son códigos de un solo uso que puedes utilizar si pierdes acceso a tu móvil:
- Cada código solo se puede usar una vez
- Se eliminan automáticamente después de usarse
- Puedes regenerarlos en cualquier momento con `POST /auth/2fa/regenerate-backup-codes`

---

## 🔄 Flujos de Autenticación

### Flujo 1: Login sin 2FA
```
1. POST /auth/login
   └── Respuesta: accessToken + refreshToken
2. Usar accessToken en todas las peticiones protegidas
```

### Flujo 2: Login con 2FA
```
1. POST /auth/login
   └── Respuesta: tempToken (requiresTwoFactor: true)
2. Abrir app 2FAS y copiar código actual
3. POST /auth/verify-2fa con tempToken + código 2FA
   └── Respuesta: accessToken + refreshToken
4. Usar accessToken en todas las peticiones protegidas
```

### Flujo 3: Configurar 2FA por primera vez
```
1. POST /auth/login (sin 2FA)
   └── Respuesta: accessToken
2. POST /auth/2fa/generate (con accessToken)
   └── Respuesta: qrCode + secret + backupCodes
3. Escanear QR con 2FAS
4. POST /auth/2fa/enable con código de 2FAS
   └── Respuesta: success: true
5. Desde ahora, el login requerirá 2FA
```

### Flujo 4: Renovar Token Expirado
```
1. Petición con accessToken expirado
   └── Respuesta: 401 Unauthorized
2. POST /auth/refresh con refreshToken
   └── Respuesta: nuevo accessToken
3. Continuar usando el nuevo accessToken
```

---

## 🛡️ Seguridad Implementada

### Características de Seguridad

1. **JWT con Expiración Corta**
   - Access Token: 15 minutos
   - Refresh Token: 7 días

2. **Hashing de Tokens**
   - Los tokens se almacenan hasheados (SHA256) en la base de datos
   - Nunca se almacenan tokens en texto plano

3. **Validación de Sesiones**
   - Cada petición verifica que la sesión esté activa
   - Las sesiones expiradas se desactivan automáticamente

4. **2FA con TOTP**
   - Compatible con estándar RFC 6238
   - Ventana de tolerancia de ±60 segundos
   - Códigos de respaldo de un solo uso

5. **Auditoría Completa**
   - Todos los intentos de login se registran
   - Se guarda IP y User-Agent de cada sesión

6. **Guards Globales**
   - Protección automática de todos los endpoints
   - Decorador `@Public()` para rutas públicas
   - Decorador `@Roles()` para control de acceso por rol

---

## 🐛 Troubleshooting

### Error: "Token no proporcionado"
- Verifica que estés enviando el header `Authorization: Bearer {token}`
- Asegúrate de que el token no tenga espacios extra

### Error: "Sesión no encontrada o inválida"
- El token ha expirado, usa el refresh token
- La sesión fue cerrada manualmente

### Error: "Código 2FA inválido"
- Verifica que el código sea el actual (cambia cada 30 segundos)
- Asegúrate de que la hora del servidor esté sincronizada
- Intenta con un código de respaldo si no funciona

### Error: "Token temporal no válido para acceso"
- Estás intentando usar el tempToken en lugar del accessToken
- Completa el proceso de verificación 2FA primero

---

## 📊 Monitoring y Mantenimiento

### Consultas Útiles

```sql
-- Ver sesiones activas
SELECT * FROM active_user_sessions;

-- Ver intentos de login fallidos
SELECT * FROM failed_login_attempts;

-- Ver usuarios con 2FA habilitado
SELECT u.u_email, u.u_name, utf.tfa_enabled, utf.tfa_last_used
FROM users u
INNER JOIN user_two_factor utf ON u.id = utf.user_id
WHERE utf.tfa_enabled = TRUE;

-- Limpiar sesiones expiradas manualmente
CALL clean_expired_sessions();

-- Limpiar tokens expirados manualmente
CALL clean_expired_tokens();
```

---

## 📝 Notas Finales

- El sistema está diseñado para no modificar las tablas existentes
- Todas las funcionalidades de auth son independientes
- Los Guards se aplican globalmente pero permiten excepciones con `@Public()`
- El 2FA es opcional por usuario
- Los códigos de respaldo son de un solo uso

---

## 🤝 Soporte

Para problemas o dudas:
1. Revisa esta guía completa
2. Verifica los logs del backend
3. Consulta las tablas de auditoría en la base de datos

