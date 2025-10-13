# 📘 GUÍA COMPLETA DE PRUEBAS - SISTEMA DE AUTENTICACIÓN CON JWT Y 2FA

## 📋 Tabla de Contenidos
1. [Instalación y Configuración](#instalación-y-configuración)
2. [Configuración de Base de Datos](#configuración-de-base-de-datos)
3. [Pruebas con Postman](#pruebas-con-postman)
4. [Flujo de Autenticación](#flujo-de-autenticación)
5. [Troubleshooting](#troubleshooting)

---

## 🔧 Instalación y Configuración

### 1. Instalar Dependencias

```bash
cd backend_nest_js_hogar_de_ancianos

# Instalar dependencias de JWT y 2FA
npm install --save @nestjs/jwt @nestjs/passport passport passport-jwt
npm install --save speakeasy qrcode
npm install --save bcrypt

# Instalar tipos de TypeScript
npm install --save-dev @types/passport-jwt @types/speakeasy @types/qrcode @types/bcrypt
```

### 2. Configurar Variables de Entorno

Crea o actualiza tu archivo `.env` en la raíz del proyecto:

```env
# AUTENTICACIÓN
JWT_SECRET=tu-secret-key-super-seguro-cambiar-en-produccion-2024
JWT_ACCESS_TOKEN_EXPIRATION=15m
JWT_REFRESH_TOKEN_EXPIRATION=7d

# BASE DE DATOS
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=tu_password
DB_DATABASE=hogar_de_ancianos

# APLICACIÓN
PORT=3000
NODE_ENV=development
```

---

## 🗄️ Configuración de Base de Datos

### 1. Ejecutar Script SQL

Ejecuta el script SQL ubicado en `sql/auth_tables.sql` para crear las tablas necesarias:

```bash
mysql -u root -p hogar_de_ancianos < sql/auth_tables.sql
```

O manualmente en MySQL Workbench/phpMyAdmin ejecutando el contenido de `auth_tables.sql`.

### 2. Verificar Tablas Creadas

Verifica que se crearon las siguientes tablas:
- `user_two_factor`
- `user_sessions`
- `login_attempts`
- `password_reset_tokens`
- `email_verification_tokens`

```sql
USE hogar_de_ancianos;
SHOW TABLES;
```

### 3. Crear Usuario de Prueba

Necesitas crear un usuario en la tabla `users` para probar. Primero, genera un hash de contraseña:

```javascript
// Ejecuta esto en Node.js o en un script temporal
const bcrypt = require('bcrypt');
const password = 'Password123!';
bcrypt.hash(password, 10).then(hash => console.log(hash));
```

Luego inserta el usuario:

```sql
-- Primero crear un rol si no existe
INSERT INTO roles (r_name) VALUES ('admin');

-- Insertar usuario de prueba
INSERT INTO users (
    u_identification, 
    u_name, 
    u_f_last_name, 
    u_s_last_name, 
    u_email, 
    u_password, 
    u_is_active, 
    role_id
) VALUES (
    '123456789',
    'Juan',
    'Pérez',
    'González',
    'admin@hogar.com',
    '$2b$10$tu_hash_generado_aqui', -- Reemplazar con el hash generado
    TRUE,
    1
);
```

---

## 🚀 Pruebas con Postman

### Configuración Inicial de Postman

1. **Crear una nueva Colección**: "Hogar de Ancianos - Auth"
2. **Configurar Variables de Colección**:
   - Variable: `base_url`
   - Valor: `http://localhost:3000`

### Variables a usar en las pruebas:
- `{{base_url}}` = `http://localhost:3000`
- `{{access_token}}` = Se guardará automáticamente después del login
- `{{refresh_token}}` = Se guardará automáticamente después del login
- `{{temp_token}}` = Token temporal para 2FA

---

## 📍 ENDPOINTS Y PRUEBAS

### 1️⃣ LOGIN SIN 2FA

**Endpoint**: `POST {{base_url}}/auth/login`

**Headers**:
```
Content-Type: application/json
```

**Body** (raw JSON):
```json
{
  "email": "admin@hogar.com",
  "password": "Password123!"
}
```

**Respuesta Esperada (200 OK)**:
```json
{
  "requiresTwoFactor": false,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@hogar.com",
    "name": "Juan Pérez",
    "roleId": 1
  }
}
```

**Script de Post-Response** (pestaña Tests en Postman):
```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    if (jsonData.accessToken) {
        pm.collectionVariables.set("access_token", jsonData.accessToken);
        pm.collectionVariables.set("refresh_token", jsonData.refreshToken);
        console.log("Tokens guardados exitosamente");
    }
}
```

---

### 2️⃣ OBTENER PERFIL DEL USUARIO

**Endpoint**: `GET {{base_url}}/auth/me`

**Headers**:
```
Authorization: Bearer {{access_token}}
```

**Respuesta Esperada (200 OK)**:
```json
{
  "userId": 1,
  "email": "admin@hogar.com",
  "roleId": 1,
  "role": {
    "id": 1,
    "r_name": "admin"
  }
}
```

---

### 3️⃣ GENERAR QR PARA 2FA

**Endpoint**: `POST {{base_url}}/auth/2fa/generate`

**Headers**:
```
Authorization: Bearer {{access_token}}
```

**Respuesta Esperada (200 OK)**:
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
    "2. Presiona el botón '+' para añadir una cuenta",
    "3. Selecciona 'Escanear código QR'",
    "4. Escanea el código QR mostrado arriba",
    "5. Guarda los códigos de respaldo en un lugar seguro",
    "6. Verifica el código generado en el siguiente paso"
  ]
}
```

**¿Cómo usar el QR?**
1. Copia el valor de `qrCode` (la cadena base64 completa)
2. Pégalo en un navegador o usa una herramienta para convertir base64 a imagen
3. Escanea con tu app 2FAS
4. O también puedes copiar el `secret` manualmente en 2FAS

---

### 4️⃣ HABILITAR 2FA

**Endpoint**: `POST {{base_url}}/auth/2fa/enable`

**Headers**:
```
Authorization: Bearer {{access_token}}
Content-Type: application/json
```

**Body** (raw JSON):
```json
{
  "token": "123456"
}
```
*(Reemplaza `123456` con el código de 6 dígitos que aparece en tu app 2FAS)*

**Respuesta Esperada (200 OK)**:
```json
{
  "success": true,
  "message": "2FA habilitado exitosamente. Ahora tu cuenta está más segura."
}
```

---

### 5️⃣ VERIFICAR ESTADO DE 2FA

**Endpoint**: `GET {{base_url}}/auth/2fa/status`

**Headers**:
```
Authorization: Bearer {{access_token}}
```

**Respuesta Esperada (200 OK)**:
```json
{
  "enabled": true,
  "lastUsed": "2025-10-13T10:30:00.000Z",
  "hasBackupCodes": true
}
```

---

### 6️⃣ LOGIN CON 2FA HABILITADO (Paso 1)

**Endpoint**: `POST {{base_url}}/auth/login`

**Headers**:
```
Content-Type: application/json
```

**Body** (raw JSON):
```json
{
  "email": "admin@hogar.com",
  "password": "Password123!"
}
```

**Respuesta Esperada (200 OK)**:
```json
{
  "requiresTwoFactor": true,
  "tempToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Script de Post-Response**:
```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    if (jsonData.requiresTwoFactor && jsonData.tempToken) {
        pm.collectionVariables.set("temp_token", jsonData.tempToken);
        console.log("Token temporal guardado. Ahora verifica con 2FA");
    }
}
```

---

### 7️⃣ LOGIN CON 2FA HABILITADO (Paso 2 - Verificar)

**Endpoint**: `POST {{base_url}}/auth/verify-2fa`

**Headers**:
```
Content-Type: application/json
```

**Body** (raw JSON):
```json
{
  "sessionToken": "{{temp_token}}",
  "token": "123456"
}
```
*(Reemplaza `123456` con el código actual de tu app 2FAS)*

**Respuesta Esperada (200 OK)**:
```json
{
  "requiresTwoFactor": false,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@hogar.com",
    "name": "Juan Pérez",
    "roleId": 1
  }
}
```

**Script de Post-Response**:
```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    if (jsonData.accessToken) {
        pm.collectionVariables.set("access_token", jsonData.accessToken);
        pm.collectionVariables.set("refresh_token", jsonData.refreshToken);
        console.log("Login con 2FA exitoso. Tokens guardados.");
    }
}
```

---

### 8️⃣ RENOVAR TOKEN (REFRESH)

**Endpoint**: `POST {{base_url}}/auth/refresh`

**Headers**:
```
Content-Type: application/json
```

**Body** (raw JSON):
```json
{
  "refreshToken": "{{refresh_token}}"
}
```

**Respuesta Esperada (200 OK)**:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Script de Post-Response**:
```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    pm.collectionVariables.set("access_token", jsonData.accessToken);
    console.log("Access token renovado exitosamente");
}
```

---

### 9️⃣ OBTENER SESIONES ACTIVAS

**Endpoint**: `GET {{base_url}}/auth/sessions`

**Headers**:
```
Authorization: Bearer {{access_token}}
```

**Respuesta Esperada (200 OK)**:
```json
{
  "sessions": [
    {
      "id": 1,
      "ipAddress": "::1",
      "userAgent": "PostmanRuntime/7.32.3",
      "createdAt": "2025-10-13T10:00:00.000Z",
      "lastActivity": "2025-10-13T10:30:00.000Z",
      "expiresAt": "2025-10-20T10:00:00.000Z"
    }
  ]
}
```

---

### 🔟 CERRAR SESIÓN

**Endpoint**: `POST {{base_url}}/auth/logout`

**Headers**:
```
Authorization: Bearer {{access_token}}
```

**Respuesta Esperada (200 OK)**:
```json
{
  "message": "Sesión cerrada exitosamente"
}
```

---

### 1️⃣1️⃣ CERRAR TODAS LAS SESIONES

**Endpoint**: `DELETE {{base_url}}/auth/sessions/all`

**Headers**:
```
Authorization: Bearer {{access_token}}
```

**Respuesta Esperada (200 OK)**:
```json
{
  "success": true,
  "message": "Todas las sesiones han sido cerradas"
}
```

---

### 1️⃣2️⃣ CERRAR SESIÓN ESPECÍFICA

**Endpoint**: `DELETE {{base_url}}/auth/sessions/:sessionId`

**Headers**:
```
Authorization: Bearer {{access_token}}
```

**Ejemplo**: `DELETE {{base_url}}/auth/sessions/1`

**Respuesta Esperada (200 OK)**:
```json
{
  "success": true,
  "message": "Sesión cerrada exitosamente"
}
```

---

### 1️⃣3️⃣ REGENERAR CÓDIGOS DE RESPALDO

**Endpoint**: `POST {{base_url}}/auth/2fa/regenerate-backup-codes`

**Headers**:
```
Authorization: Bearer {{access_token}}
```

**Respuesta Esperada (200 OK)**:
```json
{
  "success": true,
  "message": "Códigos de respaldo regenerados. Guárdalos en un lugar seguro.",
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
  ]
}
```

---

### 1️⃣4️⃣ DESHABILITAR 2FA

**Endpoint**: `POST {{base_url}}/auth/2fa/disable`

**Headers**:
```
Authorization: Bearer {{access_token}}
```

**Respuesta Esperada (200 OK)**:
```json
{
  "success": true,
  "message": "2FA deshabilitado. Tu cuenta es menos segura ahora."
}
```

---

## 🔄 Flujo de Autenticación Completo

### Flujo sin 2FA:
```
1. POST /auth/login
   ↓
2. Recibe accessToken y refreshToken
   ↓
3. Usa accessToken en cada petición (Header: Authorization: Bearer {token})
   ↓
4. Cuando accessToken expire (15 min), usa POST /auth/refresh con refreshToken
   ↓
5. POST /auth/logout para cerrar sesión
```

### Flujo con 2FA:
```
1. POST /auth/login
   ↓
2. Recibe requiresTwoFactor: true y tempToken
   ↓
3. Abre app 2FAS y obtén código de 6 dígitos
   ↓
4. POST /auth/verify-2fa con tempToken y código
   ↓
5. Recibe accessToken y refreshToken
   ↓
6. Usa accessToken en cada petición
   ↓
7. POST /auth/logout para cerrar sesión
```

### Configurar 2FA:
```
1. POST /auth/login (login normal)
   ↓
2. POST /auth/2fa/generate
   ↓
3. Escanea QR con app 2FAS o ingresa secret manualmente
   ↓
4. Copia código de 6 dígitos de la app
   ↓
5. POST /auth/2fa/enable con el código
   ↓
6. 2FA está ahora activo
   ↓
7. Próximos logins requerirán 2FA
```

---

## 🔐 Probar Endpoint Protegido (Ejemplo con Users)

### Listar Usuarios (Requiere Auth)

**Endpoint**: `GET {{base_url}}/users`

**Headers**:
```
Authorization: Bearer {{access_token}}
```

**Respuesta si NO hay token**:
```json
{
  "statusCode": 401,
  "message": "Token no proporcionado",
  "error": "Unauthorized"
}
```

**Respuesta si token es válido (200 OK)**:
```json
[
  {
    "id": 1,
    "email": "admin@hogar.com",
    "name": "Juan",
    "fLastName": "Pérez",
    "roleId": 1
  }
]
```

---

## 🛠️ Troubleshooting

### Error: "Token no proporcionado"
**Causa**: No se envió el header Authorization o está mal formado.
**Solución**: Asegúrate de enviar `Authorization: Bearer {tu_access_token}`

### Error: "Token inválido"
**Causa**: El token expiró (15 min) o es inválido.
**Solución**: Usa el endpoint `/auth/refresh` con tu refreshToken

### Error: "Sesión no encontrada o inválida"
**Causa**: La sesión fue cerrada o expiró.
**Solución**: Haz login nuevamente

### Error: "Código 2FA inválido"
**Causa**: El código ingresado es incorrecto o ya expiró (30 segundos).
**Solución**: Genera un nuevo código en tu app 2FAS e inténtalo rápidamente

### Error: "Credenciales inválidas"
**Causa**: Email o contraseña incorrectos.
**Solución**: Verifica que el usuario existe en la DB y la contraseña es correcta

### Error al escanear QR
**Causa**: El QR está corrupto o la app no lo reconoce.
**Solución**: Usa el `secret` manualmente en 2FAS (opción "Añadir manualmente")

---

## 📊 Verificar en Base de Datos

### Verificar sesiones activas:
```sql
SELECT * FROM user_sessions WHERE is_active = TRUE;
```

### Verificar intentos de login:
```sql
SELECT * FROM login_attempts ORDER BY attempted_at DESC LIMIT 10;
```

### Verificar configuración 2FA:
```sql
SELECT * FROM user_two_factor WHERE user_id = 1;
```

### Limpiar sesiones expiradas manualmente:
```sql
CALL clean_expired_sessions();
```

---

## 🎯 Checklist de Pruebas

- [ ] Login sin 2FA funciona
- [ ] Obtener perfil con token funciona
- [ ] Generar QR para 2FA funciona
- [ ] Escanear QR con 2FAS funciona
- [ ] Habilitar 2FA funciona
- [ ] Login con 2FA funciona (ambos pasos)
- [ ] Refresh token funciona
- [ ] Logout funciona
- [ ] Verificar endpoint protegido sin token devuelve 401
- [ ] Verificar endpoint protegido con token funciona
- [ ] Códigos de respaldo funcionan
- [ ] Deshabilitar 2FA funciona

---

## 📱 Configuración en 2FAS App

### Método 1: Escanear QR
1. Abre 2FAS en tu móvil
2. Toca el botón "+" (agregar)
3. Selecciona "Escanear código QR"
4. Apunta la cámara al QR generado

### Método 2: Ingresar Secret Manualmente
1. Abre 2FAS en tu móvil
2. Toca el botón "+" (agregar)
3. Selecciona "Introducir clave manualmente"
4. Nombre del servicio: `Hogar de Ancianos`
5. Secret key: El valor del campo `secret` de la respuesta
6. Tipo: `Basado en tiempo (TOTP)`
7. Algoritmo: `SHA1`
8. Dígitos: `6`
9. Período: `30 segundos`

---

## 🔄 Automatización en Postman

### Script para Auto-Login en Pre-request Script de la Colección:

```javascript
// Esto se ejecutará antes de cada petición
const access_token = pm.collectionVariables.get("access_token");

// Si no hay token, hacer login automático
if (!access_token && pm.info.requestName !== "Login") {
    pm.sendRequest({
        url: pm.collectionVariables.get("base_url") + "/auth/login",
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: {
            mode: "raw",
            raw: JSON.stringify({
                email: "admin@hogar.com",
                password: "Password123!"
            })
        }
    }, function(err, response) {
        if (!err && response.code === 200) {
            const jsonData = response.json();
            if (jsonData.accessToken) {
                pm.collectionVariables.set("access_token", jsonData.accessToken);
                pm.collectionVariables.set("refresh_token", jsonData.refreshToken);
            }
        }
    });
}
```

---

##   Endpoints Completados

| Método | Endpoint | Descripción | Auth Requerido |
|--------|----------|-------------|----------------|
| POST | `/auth/login` | Login de usuario | No |
| POST | `/auth/verify-2fa` | Verificar código 2FA | No |
| POST | `/auth/refresh` | Renovar access token | No |
| POST | `/auth/logout` | Cerrar sesión | Sí |
| GET | `/auth/me` | Obtener perfil | Sí |
| POST | `/auth/2fa/generate` | Generar QR 2FA | Sí |
| POST | `/auth/2fa/enable` | Habilitar 2FA | Sí |
| POST | `/auth/2fa/disable` | Deshabilitar 2FA | Sí |
| GET | `/auth/2fa/status` | Estado de 2FA | Sí |
| POST | `/auth/2fa/regenerate-backup-codes` | Regenerar códigos | Sí |
| GET | `/auth/sessions` | Listar sesiones activas | Sí |
| DELETE | `/auth/sessions/all` | Cerrar todas las sesiones | Sí |
| DELETE | `/auth/sessions/:id` | Cerrar sesión específica | Sí |

---

## 🎓 Notas Importantes

1. **Access Token** expira en 15 minutos
2. **Refresh Token** expira en 7 días
3. **Temp Token** (para 2FA) expira en 5 minutos
4. **Códigos TOTP** son válidos por 30 segundos
5. **Códigos de respaldo** son de un solo uso
6. **Sesiones** se limpian automáticamente cada hora (evento programado)
7. El **Guard JWT** se aplica globalmente a todos los endpoints
8. Usa el decorador `@Public()` para endpoints públicos
9. Usa el decorador `@Roles()` para restringir por rol

---

## 🚀 Iniciar Aplicación

```bash
# Desarrollo
npm run start:dev

# Producción
npm run build
npm run start:prod
```

---

¡Listo! Ahora tienes un sistema de autenticación completo con JWT y 2FA funcionando. 🎉
