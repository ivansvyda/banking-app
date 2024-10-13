import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createTransactionInput: CreateTransactionInput) {
    const card = await this.prismaService.card.findUnique({
      where: { id: createTransactionInput.senderId },
    });

    if (card.balance >= createTransactionInput.amount) {
      const transaction = await this.prismaService.transaction.create({
        data: {
          amount: createTransactionInput.amount,
          sender: { connect: { id: createTransactionInput.senderId } },
          reciever: { connect: { id: createTransactionInput.recieverId } },
        },
        include: {
          sender: true,
          reciever: true,
        },
      });

      await this.prismaService.card.update({
        where: { id: createTransactionInput.senderId },
        data: {
          balance: {
            decrement: createTransactionInput.amount,
          },
        },
      });

      await this.prismaService.card.update({
        where: { id: createTransactionInput.recieverId },
        data: {
          balance: {
            increment: createTransactionInput.amount,
          },
        },
      });

      return transaction;
    }

    throw new BadRequestException('Insufficient funds on balance!');
  }

  async userTransactions(id: string) {
    return await this.prismaService.transaction.findMany({
      where: {
        sender: {
          ownerId: id,
        },
      },
    });
  }
}
