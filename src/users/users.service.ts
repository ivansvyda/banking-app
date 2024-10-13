import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserInput: CreateUserInput) {
    const { password, ...data } = createUserInput;
    const existsUser = await this.prismaService.user.findUnique({
      where: { email: data.email },
    });
    if (existsUser) {
      throw new ConflictException('User already exists!');
    }
    const hash = await bcrypt.hash(password, 10);

    if (!hash) {
      throw new InternalServerErrorException('Failed to create a user!');
    }

    return await this.prismaService.user.create({
      data: {
        ...data,
        hash: hash,
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    return await this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async findOne(id: string) {
    return await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findMany(id: string) {
    return await this.prismaService.user.findMany({
      where: {
        id: {
          not: id,
        },
        cards: {
          some: {},
        },
      },
      include: { cards: true },
    });
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    return await this.prismaService.user.update({
      where: { id },
      data: {
        ...updateUserInput,
      },
    });
  }
}
