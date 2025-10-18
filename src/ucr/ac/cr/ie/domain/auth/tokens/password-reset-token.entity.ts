export class PasswordResetToken {
  id: number;
  userId: number;
  token: string;
  expiresAt: Date;
  used: boolean;
  usedAt?: Date;
  createdAt: Date;

  constructor(
    id: number,
    userId: number,
    token: string,
    expiresAt: Date,
    used: boolean = false,
    usedAt?: Date,
    createdAt?: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.token = token;
    this.expiresAt = expiresAt;
    this.used = used;
    this.usedAt = usedAt;
    this.createdAt = createdAt || new Date();
  }
}