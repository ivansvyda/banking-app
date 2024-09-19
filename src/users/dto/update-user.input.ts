import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String)
  email: string;
}
