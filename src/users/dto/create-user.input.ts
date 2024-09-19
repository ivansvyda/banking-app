import { InputType, Field } from '@nestjs/graphql';
import { Card } from '../../cards/entities/card.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
