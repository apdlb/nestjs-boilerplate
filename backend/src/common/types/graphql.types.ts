import { GqlExecutionContext } from '@nestjs/graphql';
import { Request, Response } from 'express';

export type GraphQLContext = GqlExecutionContext & {
  req: Request;
  res: Response;
};
