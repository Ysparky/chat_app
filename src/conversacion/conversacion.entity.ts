import { Field, Int } from '@nestjs/graphql';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Conversacion {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  nombre: string;

  @Field(() => Boolean)
  @Column({ default: false })
  active: boolean;

  @Field(() => Boolean)
  @Column({ default: true })
  flag: boolean;

  //   participantes;
}
