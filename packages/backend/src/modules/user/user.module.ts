import { Module } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
