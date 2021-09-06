import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepository
      .createQueryBuilder('user')
      .where('user.parent is null')
      .andWhere('user.flag = true')
      .getMany();
    return this.assignChildrenToParent(users);
  }

  async findChildByParentId(id: number) {
    return this.userRepository
      .createQueryBuilder('child')
      .leftJoinAndSelect('child.parent', 'parent')
      .where('child.parent is not null AND parent.id = :id', { id })
      .andWhere('child.flag = true')
      .orderBy('child.id', 'ASC')
      .getMany();
  }

  async assignChildrenToParent(users: User[]) {
    for await (const user of users) {
      const children = await this.findChildByParentId(user.id);
      user.children = children;
    }
    return users;
  }
}
