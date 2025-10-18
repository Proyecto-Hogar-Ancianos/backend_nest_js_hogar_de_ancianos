export class EmailVerificationToken {
  id: number;
  userId: number;
  token: string;
  expiresAt: Date;
  verified: boolean;
  verifiedAt?: Date;
  createdAt: Date;

  constructor(
    id: number,
    userId: number,
    token: string,
    expiresAt: Date,
    verified: boolean = false,
    verifiedAt?: Date,
    createdAt?: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.token = token;
    this.expiresAt = expiresAt;
    this.verified = verified;
    this.verifiedAt = verifiedAt;
    this.createdAt = createdAt || new Date();
  }
}