import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserReturnType } from 'src/typings';

export const User = createParamDecorator(
  (data: UserReturnType, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
