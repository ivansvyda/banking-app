import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CardsService } from './cards.service';
import { Card } from './entities/card.entity';
import { CreateCardInput } from './dto/create-card.input';
import { UpdateCardInput } from './dto/update-card.input';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '@prisma/client';

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
  findAll(@CurrentUser() user: User) {
    return this.cardsService.findAll(user);
  }

  @Query(() => Card, { name: 'card' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.cardsService.findOne(id);
  }

  @Mutation(() => Card)
  updateCard(@Args('updateCardInput') updateCardInput: UpdateCardInput) {
    return this.cardsService.update(updateCardInput.id, updateCardInput);
  }

  @Mutation(() => Card)
  removeCard(@Args('id', { type: () => String }) id: string) {
    return this.cardsService.remove(id);
  }
}
