import { IsOptional, IsString } from 'class-validator';

import { UpdateUserInput } from '@/graphql';

export class UpdateUserDto implements UpdateUserInput {
  @IsString()
  id: string;

  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}
