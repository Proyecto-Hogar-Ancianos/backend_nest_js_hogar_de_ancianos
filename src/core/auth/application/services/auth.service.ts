import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { User } from '../../../users/domain/entities/user.entity';
import { UserSession } from '../../domain/entities/user-session.entity';
import { LoginAttempt } from '../../domain/entities/login-attempt.entity';
import { TwoFactorService } from './two-factor.service';

export interface JwtPayload {
  sub: number;
  email: string;
  roleId?: number;
  require2FA?: boolean;
}

export interface LoginResponse {
  requiresTwoFactor: boolean;
  tempToken?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: {
    id: number;
    email: string;
    name: string;
    roleId?: number;
  };
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(UserSession)
    private readonly sessionRepository: Repository<UserSession>,
    @InjectRepository(LoginAttempt)
    private readonly loginAttemptRepository: Repository<LoginAttempt>,
    private readonly jwtService: JwtService,
    private readonly twoFactorService: TwoFactorService,
  ) {}

  /**
   * Login de usuario
   */
  async login(
    email: string,
    password: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<LoginResponse> {
    // Buscar usuario
    const user = await this.userRepository.findOne({
      where: { email },
      relations: ['role'],
    });

    // Registrar intento de login
    const loginAttempt = this.loginAttemptRepository.create({
      email,
      userId: user?.id,
      ipAddress,
      attemptSuccessful: false,
      failureReason: null,
    });

    // Validar usuario
    if (!user) {
      loginAttempt.failureReason = 'user_not_found';
      await this.loginAttemptRepository.save(loginAttempt);
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar si el usuario está activo
    if (!user.isActive) {
      loginAttempt.failureReason = 'user_inactive';
      await this.loginAttemptRepository.save(loginAttempt);
      throw new UnauthorizedException('Usuario inactivo');
    }

    // Validar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      loginAttempt.failureReason = 'invalid_password';
      await this.loginAttemptRepository.save(loginAttempt);
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Verificar si tiene 2FA habilitado
    const has2FA = await this.twoFactorService.isTwoFactorEnabled(user.id);

    if (has2FA) {
      // Generar token temporal para verificación 2FA
      const tempToken = this.generateTempToken(user);

      loginAttempt.failureReason = 'requires_2fa';
      await this.loginAttemptRepository.save(loginAttempt);

      return {
        requiresTwoFactor: true,
        tempToken,
      };
    }

    // Login exitoso sin 2FA
    loginAttempt.attemptSuccessful = true;
    loginAttempt.failureReason = null;
    await this.loginAttemptRepository.save(loginAttempt);

    // Generar tokens
    const { accessToken, refreshToken } = await this.generateTokens(user, ipAddress, userAgent);

    return {
      requiresTwoFactor: false,
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: `${user.name} ${user.fLastName}`,
        roleId: user.roleId,
      },
    };
  }

  /**
   * Verifica 2FA y completa el login
   */
  async verifyTwoFactorAndLogin(
    tempToken: string,
    tfaToken: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<LoginResponse> {
    // Verificar token temporal
    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify(tempToken);
    } catch (error) {
      throw new UnauthorizedException('Token temporal inválido o expirado');
    }

    if (!payload.require2FA) {
      throw new BadRequestException('Este token no requiere verificación 2FA');
    }

    // Buscar usuario
    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
      relations: ['role'],
    });

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    // Verificar código 2FA
    const isValid = await this.twoFactorService.verifyTwoFactorToken(user.id, tfaToken);

    // Registrar intento
    const loginAttempt = this.loginAttemptRepository.create({
      email: user.email,
      userId: user.id,
      ipAddress,
      attemptSuccessful: isValid,
      failureReason: isValid ? null : 'invalid_2fa',
    });
    await this.loginAttemptRepository.save(loginAttempt);

    if (!isValid) {
      throw new UnauthorizedException('Código 2FA inválido');
    }

    // Generar tokens finales
    const { accessToken, refreshToken } = await this.generateTokens(user, ipAddress, userAgent);

    return {
      requiresTwoFactor: false,
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        name: `${user.name} ${user.fLastName}`,
        roleId: user.roleId,
      },
    };
  }

  /**
   * Genera tokens de acceso y refresh
   */
  private async generateTokens(
    user: User,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      roleId: user.roleId,
    };

    // Generar access token (15 minutos)
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: '15m',
    });

    // Generar refresh token (7 días)
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: '7d',
    });

    // Hash de los tokens para almacenar
    const sessionTokenHash = crypto.createHash('sha256').update(accessToken).digest('hex');
    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');

    // Guardar sesión
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    const session = this.sessionRepository.create({
      userId: user.id,
      sessionToken: sessionTokenHash,
      refreshToken: refreshTokenHash,
      ipAddress,
      userAgent,
      expiresAt,
      isActive: true,
    });

    await this.sessionRepository.save(session);

    return { accessToken, refreshToken };
  }

  /**
   * Genera token temporal para verificación 2FA (5 minutos)
   */
  private generateTempToken(user: User): string {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      require2FA: true,
    };

    return this.jwtService.sign(payload, {
      expiresIn: '5m',
    });
  }

  /**
   * Refresh token
   */
  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    // Verificar refresh token
    let payload: JwtPayload;
    try {
      payload = this.jwtService.verify(refreshToken);
    } catch (error) {
      throw new UnauthorizedException('Refresh token inválido');
    }

    // Buscar sesión activa
    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest('hex');
    const session = await this.sessionRepository.findOne({
      where: {
        userId: payload.sub,
        refreshToken: refreshTokenHash,
        isActive: true,
      },
    });

    if (!session) {
      throw new UnauthorizedException('Sesión no encontrada o inválida');
    }

    // Verificar si la sesión expiró
    if (new Date() > session.expiresAt) {
      session.isActive = false;
      await this.sessionRepository.save(session);
      throw new UnauthorizedException('Sesión expirada');
    }

    // Generar nuevo access token
    const newPayload: JwtPayload = {
      sub: payload.sub,
      email: payload.email,
      roleId: payload.roleId,
    };

    const accessToken = this.jwtService.sign(newPayload, {
      expiresIn: '15m',
    });

    // Actualizar última actividad
    session.lastActivity = new Date();
    await this.sessionRepository.save(session);

    return { accessToken };
  }

  /**
   * Logout
   */
  async logout(accessToken: string): Promise<void> {
    const tokenHash = crypto.createHash('sha256').update(accessToken).digest('hex');

    await this.sessionRepository.update(
      { sessionToken: tokenHash },
      { isActive: false },
    );
  }

  /**
   * Validar token y obtener usuario
   */
  async validateToken(token: string): Promise<User | null> {
    try {
      const payload: JwtPayload = this.jwtService.verify(token);
      
      const user = await this.userRepository.findOne({
        where: { id: payload.sub, isActive: true },
        relations: ['role'],
      });

      return user;
    } catch (error) {
      return null;
    }
  }

  /**
   * Obtener sesiones activas de un usuario
   */
  async getActiveSessions(userId: number): Promise<UserSession[]> {
    return this.sessionRepository.find({
      where: { userId, isActive: true },
      order: { lastActivity: 'DESC' },
    });
  }

  /**
   * Cerrar todas las sesiones de un usuario
   */
  async logoutAllSessions(userId: number): Promise<void> {
    await this.sessionRepository.update(
      { userId, isActive: true },
      { isActive: false },
    );
  }

  /**
   * Cerrar sesión específica
   */
  async logoutSession(sessionId: number, userId: number): Promise<void> {
    await this.sessionRepository.update(
      { id: sessionId, userId },
      { isActive: false },
    );
  }
}
