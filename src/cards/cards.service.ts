import { Injectable } from '@nestjs/common';
import { CreateCardInput } from './dto/create-card.input';
import { UpdateCardInput } from './dto/update-card.input';
import { PrismaService } from '../prisma.service';

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
    return await this.prismaService.card.create({
      data: {
        cardNumber: generateRandomNumber(12),
        type: createCardInput.type,
        owner: { connect: { id: user.id } },
      },
      include: {
        owner: true,
      },
    });
  }

  findAll(user: any) {
    return this.prismaService.card.findMany({
      where: { ownerId: user.id },
    });
  }

  findOne(id: string) {
    return `This action returns a #${id} card`;
  }

  update(id: string, updateCardInput: UpdateCardInput) {
    return `This action updates a #${id} card`;
  }

  remove(id: string) {
    return `This action removes a #${id} card`;
  }
}
