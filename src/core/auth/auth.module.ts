import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Entities
import { User } from '../users/domain/entities/user.entity';
import { UserTwoFactor } from './domain/entities/user-two-factor.entity';
import { UserSession } from './domain/entities/user-session.entity';
import { LoginAttempt } from './domain/entities/login-attempt.entity';
import { PasswordResetToken } from './domain/entities/password-reset-token.entity';
import { EmailVerificationToken } from './domain/entities/email-verification-token.entity';

// Services
import { AuthService } from './application/services/auth.service';
import { TwoFactorService } from './application/services/two-factor.service';

// Strategies
import { JwtStrategy } from './application/strategies/jwt.strategy';

// Controllers
import { AuthController } from './infrastructure/controllers/auth.controller';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserTwoFactor,
      UserSession,
      LoginAttempt,
      PasswordResetToken,
      EmailVerificationToken,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET') || 'your-secret-key-change-in-production',
        signOptions: {
          expiresIn: '15m',
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TwoFactorService,
    JwtStrategy,
    {
      provide: 'UserSessionRepository',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(UserSession),
      inject: [DataSource],
    },
    {
      provide: 'UserRepository',
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: [DataSource],
    }
  ],
  exports: [
    AuthService,
    TwoFactorService,
    JwtStrategy,
    JwtModule,
    PassportModule,
    'UserSessionRepository',
    'UserRepository'
  ],
})
export class AuthModule { }
