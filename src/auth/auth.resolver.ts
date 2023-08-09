import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { SignInInput } from './dto/sign-in.input';
import { Auth } from './entities/auth.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  signIn(@Args('input') signInInput: SignInInput) {
    return this.authService.signIn(signInInput.email, signInInput.password);
  }
}
