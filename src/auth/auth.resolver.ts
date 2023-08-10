import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { Public } from '@/common/decorators';

import { AuthService } from './auth.service';
import { SignInDto } from './dto';
import { Auth } from './entities';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  @Public()
  signIn(@Args('input') signInDto: SignInDto) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }
}
