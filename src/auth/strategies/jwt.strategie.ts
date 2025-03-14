import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategie extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_AUTH_SECRECT'),
    });
  }

  validate(payload: any): unknown {
    /** Recall again that Passport will build a user object based on the return value of our validate() method,
     * and attach it as a property on the Request object. */
    // return { userId: payload.sub, username: payload.username };
    return payload;
  }
}
