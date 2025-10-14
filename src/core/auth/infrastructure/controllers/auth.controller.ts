import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { AuthService } from '../../application/services/auth.service';
import { TwoFactorService } from '../../application/services/two-factor.service';
import { LoginDto } from '../dto/login.dto';
import { Verify2FADto } from '../dto/verify-2fa.dto';
import { Enable2FADto } from '../dto/enable-2fa.dto';
import { RefreshTokenDto } from '../dto/refresh-token.dto';
import { JwtAuthGuard } from '../../../../common/guards/jwt-auth.guard';
import { Public } from '../../../../common/decorators/public.decorator';
import { CurrentUser } from '../../../../common/decorators/current-user.decorator';
import { Request } from 'express';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly twoFactorService: TwoFactorService,
  ) { }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login de usuario' })
  @ApiResponse({ status: 200, description: 'Login exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() loginDto: LoginDto, @Req() req: Request) {
    const ipAddress = req.ip || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    return this.authService.login(
      loginDto.email,
      loginDto.password,
      ipAddress,
      userAgent,
    );
  }

  @Public()
  @Post('verify-2fa')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Verifica código 2FA y completa el login' })
  @ApiResponse({ status: 200, description: 'Verificación exitosa' })
  @ApiResponse({ status: 401, description: 'Código 2FA inválido' })
  async verifyTwoFactor(@Body() verify2FADto: Verify2FADto, @Req() req: Request) {
    const ipAddress = req.ip || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    return this.authService.verifyTwoFactorAndLogin(
      verify2FADto.sessionToken,
      verify2FADto.token,
      ipAddress,
      userAgent,
    );
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Renovar access token usando refresh token' })
  @ApiResponse({ status: 200, description: 'Token renovado exitosamente' })
  @ApiResponse({ status: 401, description: 'Refresh token inválido' })
  async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto.refreshToken);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Cerrar sesión' })
  @ApiResponse({ status: 200, description: 'Sesión cerrada exitosamente' })
  async logout(@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      await this.authService.logout(token);
    }
    return { message: 'Sesión cerrada exitosamente' };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOperation({ summary: 'Obtener información del usuario autenticado' })
  @ApiResponse({ status: 200, description: 'Información del usuario' })
  getProfile(@CurrentUser() user: any) {
    return user;
  }

  // ========== 2FA Endpoints ==========

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('2fa/generate')
  @ApiOperation({ summary: 'Generar QR para configurar 2FA' })
  @ApiResponse({ status: 200, description: 'QR generado exitosamente' })
  async generateTwoFactor(@CurrentUser() user: any) {
    const result = await this.twoFactorService.generateTwoFactorSecret(
      user.sub,  // El ID está en 'sub', no en 'userId'
      user.email,
    );

    return {
      message: 'Escanea el código QR con tu app 2FAS',
      qrCode: result.qrCodeUrl,
      secret: result.secret,
      backupCodes: result.backupCodes,
      instructions: [
        '1. Abre la aplicación 2FAS en tu móvil',
        '2. Presiona el botón "+" para añadir una cuenta',
        '3. Selecciona "Escanear código QR"',
        '4. Escanea el código QR mostrado arriba',
        '5. Guarda los códigos de respaldo en un lugar seguro',
        '6. Verifica el código generado en el siguiente paso',
      ],
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('2fa/enable')
  @ApiOperation({ summary: 'Habilitar 2FA después de verificar el código' })
  @ApiResponse({ status: 200, description: '2FA habilitado exitosamente' })
  @ApiResponse({ status: 401, description: 'Código inválido' })
  async enableTwoFactor(
    @CurrentUser() user: any,
    @Body() enable2FADto: Enable2FADto,
  ) {
    const enabled = await this.twoFactorService.enableTwoFactor(
      user.sub,  // FIX: usar user.sub en lugar de user.userId
      enable2FADto.token,
    );

    if (!enabled) {
      return {
        success: false,
        message: 'Código de verificación inválido',
      };
    }

    return {
      success: true,
      message: '2FA habilitado exitosamente. Ahora tu cuenta está más segura.',
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('2fa/disable')
  @ApiOperation({ summary: 'Deshabilitar 2FA' })
  @ApiResponse({ status: 200, description: '2FA deshabilitado exitosamente' })
  async disableTwoFactor(@CurrentUser() user: any) {
    await this.twoFactorService.disableTwoFactor(user.sub);  // FIX: user.sub
    return {
      success: true,
      message: '2FA deshabilitado. Tu cuenta es menos segura ahora.',
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('2fa/status')
  @ApiOperation({ summary: 'Verificar estado de 2FA' })
  @ApiResponse({ status: 200, description: 'Estado de 2FA' })
  async getTwoFactorStatus(@CurrentUser() user: any) {
    const enabled = await this.twoFactorService.isTwoFactorEnabled(user.sub);  // FIX: user.sub
    const info = await this.twoFactorService.getTwoFactorInfo(user.sub);  // FIX: user.sub

    return {
      enabled,
      lastUsed: info?.tfaLastUsed,
      hasBackupCodes: info?.tfaBackupCodes ? JSON.parse(info.tfaBackupCodes).length > 0 : false,
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('2fa/regenerate-backup-codes')
  @ApiOperation({ summary: 'Regenerar códigos de respaldo' })
  @ApiResponse({ status: 200, description: 'Códigos regenerados exitosamente' })
  async regenerateBackupCodes(@CurrentUser() user: any) {
    const backupCodes = await this.twoFactorService.regenerateBackupCodes(user.sub);  // FIX: user.sub
    return {
      success: true,
      message: 'Códigos de respaldo regenerados. Guárdalos en un lugar seguro.',
      backupCodes,
    };
  }

  // ========== Gestión de Sesiones ==========

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('sessions')
  @ApiOperation({ summary: 'Obtener sesiones activas del usuario' })
  @ApiResponse({ status: 200, description: 'Lista de sesiones activas' })
  async getActiveSessions(@CurrentUser() user: any) {
    const sessions = await this.authService.getActiveSessions(user.sub);  // FIX: user.sub
    return {
      sessions: sessions.map((session) => ({
        id: session.id,
        ipAddress: session.ipAddress,
        userAgent: session.userAgent,
        createdAt: session.createdAt,
        lastActivity: session.lastActivity,
        expiresAt: session.expiresAt,
      })),
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('sessions/all')
  @ApiOperation({ summary: 'Cerrar todas las sesiones del usuario' })
  @ApiResponse({ status: 200, description: 'Todas las sesiones cerradas' })
  async logoutAllSessions(@CurrentUser() user: any) {
    await this.authService.logoutAllSessions(user.sub);  // FIX: user.sub
    return {
      success: true,
      message: 'Todas las sesiones han sido cerradas',
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('sessions/:sessionId')
  @ApiOperation({ summary: 'Cerrar una sesión específica' })
  @ApiResponse({ status: 200, description: 'Sesión cerrada' })
  async logoutSession(
    @CurrentUser() user: any,
    @Param('sessionId', ParseIntPipe) sessionId: number,
  ) {
    await this.authService.logoutSession(sessionId, user.sub);  // FIX: user.sub
    return {
      success: true,
      message: 'Sesión cerrada exitosamente',
    };
  }
}
