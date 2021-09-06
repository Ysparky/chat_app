import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@ObjectType()
@Entity('catmaeuser')
export class User {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ default: true })
  flag: boolean;

  @Field()
  @Column()
  name: string;

  @Field(() => [User], { nullable: true })
  @TreeChildren()
  children: User[];

  @Field(() => User, { nullable: true })
  @TreeParent()
  @JoinColumn({ name: 'parent_id' })
  parent: User;
}
