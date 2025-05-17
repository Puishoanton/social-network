import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { AUTH_ROUTE_KEYS } from 'src/shared/routes';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller(AUTH_ROUTE_KEYS.MAIN)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post(AUTH_ROUTE_KEYS.REGISTER)
  public async register(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const registerDto = {
      ...authDto,
      name: authDto.email,
      picture: 'https://picsum.photos/200/300?random',
    };

    return this.authService.register(registerDto, res);
  }

  @Post(AUTH_ROUTE_KEYS.LOGIN)
  public async login(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(authDto, res);
  }

  @Get(AUTH_ROUTE_KEYS.REFRESH)
  public async refresh(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    return this.authService.refresh(req, res)
  }

  @Get(AUTH_ROUTE_KEYS.LOGOUT)
  public async logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }
}
