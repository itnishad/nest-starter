import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RefreshJwtStrategie extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('REFRESH_JWT_SECRECT'),
    });
  }

  validate(payload: any): unknown {
    console.log({ payload });
    /** Recall again that Passport will build a user object based on the return value of our validate() method,
     * and attach it as a property on the Request object. */
    // return { userId: payload.sub, username: payload.username };
    return payload;
  }
}
