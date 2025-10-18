export class UserTwoFactor {
  id: number;
  userId: number;
  tfaSecret: string;
  tfaEnabled: boolean;
  tfaBackupCodes?: string; // JSON array as string
  tfaLastUsed?: Date;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    userId: number,
    tfaSecret: string,
    tfaEnabled: boolean = false,
    tfaBackupCodes?: string,
    tfaLastUsed?: Date,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.tfaSecret = tfaSecret;
    this.tfaEnabled = tfaEnabled;
    this.tfaBackupCodes = tfaBackupCodes;
    this.tfaLastUsed = tfaLastUsed;
    this.createdAt = createdAt || new Date();
    this.updatedAt = updatedAt || new Date();
  }
}