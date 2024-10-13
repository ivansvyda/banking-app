import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Card } from 'src/cards/entities/card.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  hash: string;

  @Field(() => [Card])
  cards: Card[];

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date)
  created_at: Date;
}
