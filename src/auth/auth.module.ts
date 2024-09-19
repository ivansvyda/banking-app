import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma.service';
import * as process from 'node:process';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    JwtStrategy,
    PrismaService,
    UsersService,
  ],
})
export class AuthModule {}
