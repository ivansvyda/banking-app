import { CreateCardInput } from './create-card.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateCardInput extends PartialType(CreateCardInput) {
  @Field(() => String)
  id: string;
}
