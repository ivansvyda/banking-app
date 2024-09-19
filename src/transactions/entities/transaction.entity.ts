import { ObjectType, Field, Float, ID } from '@nestjs/graphql';
import { Card } from '../../cards/entities/card.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Transaction {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  amount: number;

  @Field(() => Card)
  fromCard: Card;

  @Field(() => Card)
  toCard: Card;

  @Field(() => User)
  sender: User;

  @Field(() => User)
  reciever: User;

  @Field(() => Date)
  created_at: Date;
}
