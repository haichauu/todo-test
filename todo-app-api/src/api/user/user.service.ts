import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { CreateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(
    fields: FindOptionsWhere<User>,
    showException = true,
  ): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: fields,
    });
    if (!user && showException)
      throw new NotFoundException('User is not found');
    return user;
  }

  update(id: number, payload: DeepPartial<User>): Promise<User> {
    return this.usersRepository.save(
      this.usersRepository.create({
        id,
        ...payload,
      }),
    );
  }

  create(createProfileDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(
      this.usersRepository.create(createProfileDto),
    );
  }
}
