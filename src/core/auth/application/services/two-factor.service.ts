import { Injectable } from '@nestjs/common';
import * as speakeasy from 'speakeasy';
import * as qrcode from 'qrcode';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserTwoFactor } from '../../domain/entities/user-two-factor.entity';
import * as crypto from 'crypto';

@Injectable()
export class TwoFactorService {
  constructor(
    @InjectRepository(UserTwoFactor)
    private readonly twoFactorRepository: Repository<UserTwoFactor>,
  ) { }

  /**
   * Genera un secret TOTP para un usuario
   */
  async generateTwoFactorSecret(userId: number, userEmail: string): Promise<{
    secret: string;
    qrCodeUrl: string;
    backupCodes: string[];
  }> {
    // Generar secret con longitud óptima para TOTP (20 bytes = 32 caracteres base32)
    const secret = speakeasy.generateSecret({
      name: `Hogar de Ancianos (${userEmail})`,
      issuer: 'Hogar de Ancianos',
      length: 20, // CAMBIO: De 32 a 20 para compatibilidad óptima
    });

    // Generar códigos de respaldo (10 códigos)
    const backupCodes = this.generateBackupCodes(10);

    // Verificar si ya existe un registro de 2FA para este usuario
    let twoFactorRecord = await this.twoFactorRepository.findOne({
      where: { userId },
    });

    if (twoFactorRecord) {
      // Actualizar el secret existente (no habilitar hasta verificar)
      twoFactorRecord.tfaSecret = secret.base32;
      twoFactorRecord.tfaBackupCodes = JSON.stringify(backupCodes);
      twoFactorRecord.tfaEnabled = false; // Se habilitará después de verificar
    } else {
      // Crear nuevo registro
      twoFactorRecord = this.twoFactorRepository.create({
        userId,
        tfaSecret: secret.base32,
        tfaBackupCodes: JSON.stringify(backupCodes),
        tfaEnabled: false,
      });
    }

    await this.twoFactorRepository.save(twoFactorRecord);

    // Generar QR code
    const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

    return {
      secret: secret.base32,
      qrCodeUrl,
      backupCodes,
    };
  }

  /**
   * Verifica un token TOTP
   */
  async verifyTwoFactorToken(userId: number, token: string): Promise<boolean> {
    const twoFactorRecord = await this.twoFactorRepository.findOne({
      where: { userId },
    });

    if (!twoFactorRecord) {
      console.log('❌ [2FA] No se encontró registro 2FA para userId:', userId);
      return false;
    }

    // Limpiar el token: remover espacios y guiones
    const cleanToken = token.replace(/[\s-]/g, '');

    console.log('🔐 [2FA DEBUG] ==========================================');
    console.log('👤 UserId:', userId);
    console.log('🔑 Secret almacenado:', twoFactorRecord.tfaSecret);
    console.log('🎫 Token recibido (limpio):', cleanToken);
    console.log('🕐 Hora del servidor:', new Date().toISOString());
    console.log('🕐 Unix timestamp:', Math.floor(Date.now() / 1000));

    // Verificar si es un código de respaldo primero (formato: XXXXXXXX)
    if (cleanToken.length === 8 && /^[0-9A-F]+$/i.test(cleanToken)) {
      console.log('🔄 Intentando verificar como código de respaldo...');
      if (twoFactorRecord.tfaBackupCodes) {
        const backupCodes = JSON.parse(twoFactorRecord.tfaBackupCodes) as string[];
        const codeIndex = backupCodes.findIndex(
          code => code.toUpperCase() === cleanToken.toUpperCase()
        );

        if (codeIndex !== -1) {
          console.log('✅ Código de respaldo válido!');
          // Remover el código usado
          backupCodes.splice(codeIndex, 1);
          twoFactorRecord.tfaBackupCodes = JSON.stringify(backupCodes);
          twoFactorRecord.tfaLastUsed = new Date();
          await this.twoFactorRepository.save(twoFactorRecord);
          return true;
        } else {
          console.log('❌ Código de respaldo no encontrado en la lista');
        }
      }
    }

    // Verificar token TOTP (debe ser exactamente 6 dígitos)
    if (cleanToken.length === 6 && /^\d{6}$/.test(cleanToken)) {
      console.log('🔄 Intentando verificar como token TOTP...');

      // Generar códigos válidos actuales para debug
      const currentToken = speakeasy.totp({
        secret: twoFactorRecord.tfaSecret,
        encoding: 'base32',
      });
      console.log('📱 Token ACTUAL esperado:', currentToken);

      // Generar tokens en ventana de tiempo (±10 períodos = ±5 minutos)
      console.log('🕐 Tokens válidos en ventana de tiempo:');
      for (let i = -10; i <= 10; i++) {
        const timeOffset = Math.floor(Date.now() / 1000 / 30) + i;
        const testToken = speakeasy.totp({
          secret: twoFactorRecord.tfaSecret,
          encoding: 'base32',
          time: timeOffset * 30,
        });
        console.log(`  [${i > 0 ? '+' : ''}${i * 30}s] ${testToken}`);
      }

      // Verificar con ventana ampliada de 10 (±5 minutos)
      const verified = speakeasy.totp.verify({
        secret: twoFactorRecord.tfaSecret,
        encoding: 'base32',
        token: cleanToken,
        window: 10, // ±5 minutos de tolerancia
      });

      console.log('🎯 Resultado verificación:', verified ? '✅ VÁLIDO' : '❌ INVÁLIDO');
      console.log('==============================================');

      if (verified) {
        // Actualizar última vez usado
        twoFactorRecord.tfaLastUsed = new Date();
        await this.twoFactorRepository.save(twoFactorRecord);
        return true;
      }
    } else {
      console.log('❌ Token no tiene formato válido (debe ser 6 dígitos numéricos o 8 hex)');
      console.log('==============================================');
    }

    return false;
  }

  /**
   * Habilita 2FA para un usuario después de verificar el token
   */
  async enableTwoFactor(userId: number, token: string): Promise<boolean> {
    const verified = await this.verifyTwoFactorToken(userId, token);

    if (verified) {
      const record = await this.twoFactorRepository.findOne({ where: { userId } });
      if (record) {
        record.tfaEnabled = true;
        await this.twoFactorRepository.save(record);
      }
      return true;
    }

    return false;
  }

  /**
   * Deshabilita 2FA para un usuario
   */
  async disableTwoFactor(userId: number): Promise<void> {
    const record = await this.twoFactorRepository.findOne({ where: { userId } });
    if (record) {
      record.tfaEnabled = false;
      await this.twoFactorRepository.save(record);
    }
  }

  /**
   * Verifica si un usuario tiene 2FA habilitado
   */
  async isTwoFactorEnabled(userId: number): Promise<boolean> {
    const twoFactorRecord = await this.twoFactorRepository.findOne({
      where: { userId },
    });

    return twoFactorRecord?.tfaEnabled || false;
  }

  /**
   * Obtiene información de 2FA de un usuario
   */
  async getTwoFactorInfo(userId: number): Promise<UserTwoFactor | null> {
    return this.twoFactorRepository.findOne({
      where: { userId },
    });
  }

  /**
   * Genera códigos de respaldo
   */
  private generateBackupCodes(count: number): string[] {
    const codes: string[] = [];
    for (let i = 0; i < count; i++) {
      // Generar código de 8 caracteres hexadecimales
      const code = crypto.randomBytes(4).toString('hex').toUpperCase();
      codes.push(code);
    }
    return codes;
  }

  /**
   * Regenera códigos de respaldo
   */
  async regenerateBackupCodes(userId: number): Promise<string[]> {
    const twoFactorRecord = await this.twoFactorRepository.findOne({
      where: { userId },
    });

    if (!twoFactorRecord) {
      throw new Error('2FA no está configurado para este usuario');
    }

    const backupCodes = this.generateBackupCodes(10);
    twoFactorRecord.tfaBackupCodes = JSON.stringify(backupCodes);
    await this.twoFactorRepository.save(twoFactorRecord);

    return backupCodes;
  }
}