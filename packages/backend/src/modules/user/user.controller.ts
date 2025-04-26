import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { USER_ROUTE_KEYS } from 'src/shared/routes';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller(USER_ROUTE_KEYS.MAIN)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post(USER_ROUTE_KEYS.CREATE)
  public async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get(USER_ROUTE_KEYS.GET_ALL)
  public async findAll() {
    return this.userService.findAll();
  }

  @Get(USER_ROUTE_KEYS.ID)
  public async findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(USER_ROUTE_KEYS.ID)
  public async update(@Param('id') id: string, @Body() updateUserDto: any) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(USER_ROUTE_KEYS.ID)
  public async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
