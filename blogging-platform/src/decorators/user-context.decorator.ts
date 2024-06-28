import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenContent } from 'src/types/token-content.type';

const getUserByContext = (context: ExecutionContext): TokenContent => {
  return context.switchToHttp().getRequest().userContext;
};

export const UserContext = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => getUserByContext(context),
);
