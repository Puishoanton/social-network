import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserReturnType, UserReturnWithPasswordType } from './../../typings/';
import { CreateUserDto } from './dto/create-user.dto';
import { prismaUserOmit } from 'src/shared/constants';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(createUserDto: CreateUserDto): Promise<UserReturnType> {
    const hashedPassword = await hash(createUserDto.password);

    return this.prismaService.user.create({
      data: { ...createUserDto, password: hashedPassword },
      omit: prismaUserOmit,
    });
  }

  public async findByEmail(email: string): Promise<UserReturnWithPasswordType> {
    return this.prismaService.user.findUnique({
      where: {
        email,
      },
      omit: {
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
