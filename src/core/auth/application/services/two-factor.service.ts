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
    // Generar secret
    const secret = speakeasy.generateSecret({
      name: `Hogar de Ancianos (${userEmail})`,
      issuer: 'Hogar de Ancianos',
      length: 32,
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
        userId, // Set userId directly as column
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
      return false;
    }

    // Verificar token TOTP
    const verified = speakeasy.totp.verify({
      secret: twoFactorRecord.tfaSecret,
      encoding: 'base32',
      token,
      window: 2, // Permite una ventana de ±2 períodos de tiempo (60 segundos)
    });

    if (verified) {
      // Actualizar última vez usado
      twoFactorRecord.tfaLastUsed = new Date();
      await this.twoFactorRepository.save(twoFactorRecord);
      return true;
    }

    // Si el token TOTP no funciona, verificar códigos de respaldo
    if (twoFactorRecord.tfaBackupCodes) {
      const backupCodes = JSON.parse(twoFactorRecord.tfaBackupCodes) as string[];
      const codeIndex = backupCodes.indexOf(token);

      if (codeIndex !== -1) {
        // Remover el código usado
        backupCodes.splice(codeIndex, 1);
        twoFactorRecord.tfaBackupCodes = JSON.stringify(backupCodes);
        twoFactorRecord.tfaLastUsed = new Date();
        await this.twoFactorRepository.save(twoFactorRecord);
        return true;
      }
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
      // Generar código de 8 caracteres alfanuméricos
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
