export class LoginAttempt {
  id: number;
  userId?: number;
  email: string;
  ipAddress?: string;
  attemptSuccessful: boolean;
  failureReason?: string;
  attemptedAt: Date;

  constructor(
    id: number,
    email: string,
    attemptSuccessful: boolean = false,
    userId?: number,
    ipAddress?: string,
    failureReason?: string,
    attemptedAt?: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.email = email;
    this.ipAddress = ipAddress;
    this.attemptSuccessful = attemptSuccessful;
    this.failureReason = failureReason;
    this.attemptedAt = attemptedAt || new Date();
  }
}

export enum LoginFailureReason {
  INVALID_PASSWORD = 'invalid_password',
  INVALID_2FA = 'invalid_2fa',
  USER_NOT_FOUND = 'user_not_found',
  USER_INACTIVE = 'user_inactive',
  ACCOUNT_LOCKED = 'account_locked'
}