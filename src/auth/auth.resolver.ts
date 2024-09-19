import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { IsPublicRoute } from './decorators/is-public-route.decorator';
import { AuthResponse } from './entities/auth.entity';
import { AuthInput } from './dto/auth-input';

@IsPublicRoute()
@Resolver(() => AuthResponse)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse, { name: 'authenticate' })
  createAuth(@Args('authInput') authInput: AuthInput): Promise<any> {
    return this.authService.validateUser(authInput);
  }
}
