import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { verify } from 'argon2';
import { Request, Response } from 'express';
import { TokensPayloadType, UserReturnType } from 'src/typings';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  public async register(
    registerDto: CreateUserDto,
    res: Response,
  ): Promise<UserReturnType> {
    const user = await this.userService.findByEmail(registerDto.email);
    if (user)
      throw new ConflictException('User with this email already exists');

    const newUser = await this.userService.create(registerDto);

    this.generateAndAttachTokensToCookies(newUser, res);
    return newUser;
  }

  public async login(authDto: AuthDto, res: Response): Promise<UserReturnType> {
    const user = await this.userService.findByEmail(authDto.email);
    if (!user) throw new ConflictException('User with this email not found');

    const { password, ...userWithoutPassword } = user;

    const isValid = await verify(password, authDto.password);
    if (!isValid) throw new UnauthorizedException('Invalid password');

    this.generateAndAttachTokensToCookies(user, res);
    return userWithoutPassword;
  }

  public async refresh(req: Request, res: Response): Promise<UserReturnType> {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken)
      throw new UnauthorizedException('Refresh token not found');

    const payload = this.jwtService.verify<TokensPayloadType>(refreshToken, {
      secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
    });
    if (!payload) throw new UnauthorizedException('Invalid refresh token');

    const user = await this.userService.findByEmail(payload.email);
    if (!user) throw new UnauthorizedException('User not found');

    const { password, ...userWithoutPassword } = user;

    this.generateAndAttachTokensToCookies(
      { email: user.email, id: user.id },
      res,
    );
    return userWithoutPassword;
  }

  public logout(res: Response) {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    return { message: 'Logged out successfully' };
  }

  private generateAndAttachTokensToCookies(
    payload: TokensPayloadType,
    res: Response,
  ): void {
    const accessToken = this.jwtService.sign(
      {
        ...payload,
      },
      {
        secret: this.configService.getOrThrow('JWT_ACCESS_SECRET'),
        expiresIn: this.configService.getOrThrow('JWT_ACCESS_EXPIRES_IN'),
      },
    );
    const refreshToken = this.jwtService.sign(
      {
        ...payload,
      },
      {
        secret: this.configService.getOrThrow('JWT_REFRESH_SECRET'),
        expiresIn: this.configService.getOrThrow('JWT_REFRESH_EXPIRES_IN'),
      },
    );

    const cookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: this.configService.getOrThrow('SAME_SITE_COOKIE_CONFIG'),
    };

    res.cookie('accessToken', accessToken, {
      ...cookieOptions,
      maxAge: 10 * 60 * 1000,
    });
    res.cookie('refreshToken', refreshToken, {
      ...cookieOptions,
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  }
}
