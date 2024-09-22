import { Injectable } from '@nestjs/common';
import { CreateCardInput } from './dto/create-card.input';
import { PrismaService } from '../prisma.service';
import { TopUpCardInput } from './dto/topup-card.input';

const generateRandomNumber = (length: number): string => {
  let randomNumber = '';

  for (let i = 0; i < length; i++) {
    randomNumber += Math.floor(Math.random() * 10);
  }

  return randomNumber;
};

@Injectable()
export class CardsService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createCardInput: CreateCardInput, user: any) {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear() + 1;

    const formattedMonth = String(month).padStart(2, '0');

    return await this.prismaService.card.create({
      data: {
        cardNumber: generateRandomNumber(12),
        CVV: generateRandomNumber(3),
        expiresIn: `${formattedMonth}/${year}`,
        type: createCardInput.type,
        owner: { connect: { id: user.id } },
      },
      include: {
        owner: true,
      },
    });
  }

  async findUserCards(id: string) {
    return await this.prismaService.card.findMany({
      where: { ownerId: id },
    });
  }

  async topUpCard(topUpCardInput: TopUpCardInput) {
    return await this.prismaService.card.update({
      where: { id: topUpCardInput.id },
      data: {
        balance: {
          increment: topUpCardInput.amount,
        },
      },
    });
  }
}
