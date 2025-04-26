import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  public async create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  public async findAll() {
    return `This action returns all user`;
  }

  public async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  public async update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  public async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
