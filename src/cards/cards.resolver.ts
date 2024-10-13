import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CardsService } from './cards.service';
import { Card } from './entities/card.entity';
import { CreateCardInput } from './dto/create-card.input';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';
import { TopUpCardInput } from './dto/topup-card.input';

@Resolver(() => Card)
export class CardsResolver {
  constructor(private readonly cardsService: CardsService) {}

  @Mutation(() => Card)
  createCard(
    @Args('createCardInput') createCardInput: CreateCardInput,
    @CurrentUser() user: User,
  ) {
    return this.cardsService.create(createCardInput, user);
  }

  @Query(() => [Card], { name: 'cards' })
  userCards(@CurrentUser() user: User) {
    return this.cardsService.findUserCards(user.id);
  }

  @Query(() => [Card], { name: 'recipientCards' })
  recipientCards(@Args('id') id: string) {
    return this.cardsService.findRecipientCards(id);
  }

  @Query(() => Int, { name: 'recipientCardsCount' })
  recipientCardsCount(@Args('id') id: string) {
    return this.cardsService.recipientCardsCount(id);
  }

  @Mutation(() => Card)
  topUpCard(@Args('topUpCardInput') topUpCardInput: TopUpCardInput) {
    return this.cardsService.topUpCard(topUpCardInput);
  }
}
