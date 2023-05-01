import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOptionsWhere, IsNull, Like, Repository } from 'typeorm';
import { Todo } from '../../entities';
import { CreateTodoDto, SearchTodosDto } from './dto';
import { endOfDay, startOfDay } from 'date-fns';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async createTodo(dto: CreateTodoDto, userId: number) {
    return this.todoRepository.create({ ...dto, userId }).save();
  }

  async findOneTodo(fields: FindOptionsWhere<Todo>): Promise<Todo> {
    const toto = await this.todoRepository.findOne({
      where: fields,
    });
    if (!toto) throw new NotFoundException('Todo is not found');
    return toto;
  }

  async getTodoDetail(id: number, userId: number) {
    return this.findOneTodo({ userId, id });
  }

  async deleteTodoById(id: number, userId: number) {
    const todo = await this.findOneTodo({ id, userId });
    await this.todoRepository.softDelete(todo.id);
    return {
      success: true,
    };
  }

  async findTodos(dto: SearchTodosDto, userId: number) {
    const queryCondition: FindOptionsWhere<Todo> = {
      userId,
    };
    if (dto.name) {
      queryCondition.name = Like(dto.name);
    }
    if (dto.date) {
      queryCondition.createdAt = Between(
        startOfDay(dto.date),
        endOfDay(dto.date),
      );
    }
    return this.todoRepository.find({
      where: queryCondition,
    });
  }
}
