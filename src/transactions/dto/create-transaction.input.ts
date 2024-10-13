import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class CreateTransactionInput {
  @Field(() => Float)
  amount: number;

  @Field(() => String)
  senderId: string;

  @Field(() => String)
  recieverId: string;
}
