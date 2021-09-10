import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversacion } from './conversacion.entity';
import { ConversacionResolver } from './conversacion.resolver';
import { ConversacionService } from './conversacion.service';

@Module({
  imports: [TypeOrmModule.forFeature([Conversacion])],
  providers: [ConversacionResolver, ConversacionService],
})
export class ConversacionModule {}
