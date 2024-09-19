import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsResolver } from './cards.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [CardsResolver, CardsService, PrismaService],
})
export class CardsModule {}
