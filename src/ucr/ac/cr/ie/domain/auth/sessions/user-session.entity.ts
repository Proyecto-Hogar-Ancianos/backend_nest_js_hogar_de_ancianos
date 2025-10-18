export class UserSession {
  id: number;
  userId: number;
  sessionToken: string;
  refreshToken?: string;
  ipAddress?: string;
  userAgent?: string;
  isActive: boolean;
  expiresAt: Date;
  createdAt: Date;
  lastActivity: Date;

  constructor(
    id: number,
    userId: number,
    sessionToken: string,
    expiresAt: Date,
    refreshToken?: string,
    ipAddress?: string,
    userAgent?: string,
    isActive: boolean = true,
    createdAt?: Date,
    lastActivity?: Date
  ) {
    this.id = id;
    this.userId = userId;
    this.sessionToken = sessionToken;
    this.refreshToken = refreshToken;
    this.ipAddress = ipAddress;
    this.userAgent = userAgent;
    this.isActive = isActive;
    this.expiresAt = expiresAt;
    this.createdAt = createdAt || new Date();
    this.lastActivity = lastActivity || new Date();
  }
}