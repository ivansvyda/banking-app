import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Card } from '../../cards/entities/card.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

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

  @Field(() => [Transaction])
  transactions: Transaction[];

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date)
  created_at: Date;
}
