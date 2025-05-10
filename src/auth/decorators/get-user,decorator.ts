import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';
import { CustomRequest } from '../interfaces/custom-request.interfaces';
import { User } from '@prisma/client';

export const GetUser = createParamDecorator(
  (data: keyof Omit<User, 'password'> | undefined, ctx: ExecutionContext) => {
    const req: CustomRequest = ctx.switchToHttp().getRequest();
    const userReq = req.user;

    if (!userReq) {
      throw new InternalServerErrorException('User not found (request)');
    }

    const { password: _, ...user } = userReq;

    return !data ? user : user[data];
  },
);
