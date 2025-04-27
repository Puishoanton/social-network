import { Body, Controller, Post } from '@nestjs/common';
import { USER_ROUTE_KEYS } from 'src/shared/routes';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller(USER_ROUTE_KEYS.MAIN)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(USER_ROUTE_KEYS.CREATE)
  public async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
}
