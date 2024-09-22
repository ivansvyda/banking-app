import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class TopUpCardInput {
  @Field(() => String)
  id: string;

  @Field(() => Float)
  amount: number;
}
