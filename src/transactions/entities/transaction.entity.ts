import { ObjectType, Field, Float, ID } from '@nestjs/graphql';
import { Card } from '../../cards/entities/card.entity';

@ObjectType()
export class Transaction {
  @Field(() => ID)
  id: string;

  @Field(() => Float)
  amount: number;

  @Field(() => Card)
  sender: Card;

  @Field(() => Card)
  reciever: Card;

  @Field(() => Date)
  created_at: Date;
}
