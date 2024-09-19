import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthInput } from './dto/auth-input';
import { AuthResponse } from './entities/auth.entity';
import { compareSync } from 'bcrypt';
import { PayloadJwt } from './dto/payload-jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(authInput: AuthInput): Promise<AuthResponse> {
    const { email, password } = authInput;
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Failed to authorize a user!');
    }

    const isValidPassword = compareSync(password, user.hash);
    if (!isValidPassword) {
      throw new UnauthorizedException('Email or password is invalid!');
    }
    return this.login(user);
  }
  private async login(user: any): Promise<AuthResponse> {
    const payload: PayloadJwt = {
      sub: user.id,
      name: user.firstName + ' ' + user.lastName,
      email: user.email,
    };
    const { cards, transactions, ...data } = user;
    return {
      user: {
        ...data,
        cards: cards || [],
        transactions: transactions || [],
      },
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
