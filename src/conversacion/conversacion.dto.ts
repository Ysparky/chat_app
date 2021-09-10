import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class ConversacionDTO {
  @Field(() => String)
  nombre: string;
}
