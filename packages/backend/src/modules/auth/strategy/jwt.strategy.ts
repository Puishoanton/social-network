import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { TokensPayloadType } from 'src/typings';
import * as cookie from 'cookie';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => {
          const cookies = cookie.parse(req.headers.cookie || '');
          return cookies['accessToken'];
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow('JWT_ACCESS_SECRET') || 'JWT_ACCESS_SECRET',
    });
  }

  public async validate(
    payload: TokensPayloadType,
  ): Promise<TokensPayloadType> {
    return payload;
  }
}
