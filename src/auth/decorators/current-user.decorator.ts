import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;
    return user;
  },
);
