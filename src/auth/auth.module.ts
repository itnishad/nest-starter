import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from 'src/user/user.module';
import { LocalStrategie } from './strategies/local.strategie';
import { JwtStrategie } from './strategies/jwt.strategie';
import { RefreshJwtStrategie } from './strategies/refresh-jwt.strategie';
@Module({
  imports: [PassportModule, JwtModule.register({}), UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategie,
    JwtStrategie,
    RefreshJwtStrategie,
    {
      provide: 'ACCESS-TOKEN',
      useFactory: async (configService: ConfigService) => {
        return new JwtService({
          secret: configService.get('JWT_AUTH_SECRECT'),
          signOptions: {
            expiresIn: '7d',
          },
        });
      },
      inject: [ConfigService],
    },
    {
      provide: 'REFRESH-TOKEN',
      useFactory: async (configService: ConfigService) => {
        return new JwtService({
          secret: configService.get('REFRESH_JWT_SECRECT'),
          signOptions: {
            expiresIn: '7d',
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class AuthModule {}
