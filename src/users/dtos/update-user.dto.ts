import { UpdateUserInput } from '@/graphql';
import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto implements UpdateUserInput {
  @IsString()
  id: string;

  @IsString()
  firstName: string;

  @IsOptional()
  @IsString()
  lastName?: string;
}
