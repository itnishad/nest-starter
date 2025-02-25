import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategie extends PassportStrategy(Strategy) {
  validate(payload: unknown): unknown {
    console.log({ payload });

    return null;
  }
}
