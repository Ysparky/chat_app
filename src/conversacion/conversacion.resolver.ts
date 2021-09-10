import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ConversacionDTO } from './conversacion.dto';
import { Conversacion } from './conversacion.entity';
import { ConversacionService } from './conversacion.service';

@Resolver()
export class ConversacionResolver {
  constructor(private readonly conversacionService: ConversacionService) {}

  @Query(() => [Conversacion])
  conversaciones(
    @Args({ name: 'active', type: () => Boolean }) active: boolean,
  ): Promise<Conversacion[]> {
    return this.conversacionService.listConversaciones(active);
  }

  @Mutation(() => Conversacion)
  conversacionCreate(
    @Args({ name: 'data', type: () => ConversacionDTO }) data: ConversacionDTO,
  ): Promise<Conversacion> {
    return this.conversacionService.createConversacion(data);
  }

  @Mutation(() => Conversacion)
  conversacionUpdate(
    @Args({ name: 'id', type: () => Int }) id: number,
    @Args({ name: 'data', type: () => ConversacionDTO }) data: ConversacionDTO,
  ): Promise<Conversacion> {
    return this.conversacionService.updateConversacion(id, data);
  }

  @Mutation(() => Boolean)
  conversacionArchive(
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.conversacionService.archiveConversacion(id);
  }

  @Mutation(() => Boolean)
  conversacionDelete(
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<boolean> {
    return this.conversacionService.deleteConversacion(id);
  }
}
