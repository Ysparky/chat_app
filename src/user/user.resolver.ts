import { Inject } from '@nestjs/common';
import { Query } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';

export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Query((returns) => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }
}
