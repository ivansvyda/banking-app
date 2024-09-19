import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@ObjectType()
export class Card {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  cardNumber: string;

  @Field(() => String)
  type: string;

  @Field(() => Float)
  balance: number;

  @Field(() => User)
  owner: User;

  @Field(() => [Transaction])
  transactionsFrom: Transaction[];

  @Field(() => [Transaction])
  transactionsTo: Transaction[];

  @Field(() => Date)
  updated_at: Date;

  @Field(() => Date)
  created_at: Date;
}
