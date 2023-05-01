import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserDecorator } from '../auth/decorators';
import { User } from '../../entities';
import { CreateTodoDto, SearchTodosDto } from './dto';
import { TaskService } from './task.service';

@Controller('task')
@UseGuards(AuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('todo')
  @UseInterceptors(ClassSerializerInterceptor)
  async createTodo(@Body() dto: CreateTodoDto, @UserDecorator() user: User) {
    return await this.taskService.createTodo(dto, user.id);
  }

  @Get('todo/:id')
  @UseInterceptors(ClassSerializerInterceptor)
  async getTodoDetail(@Param('id') id: number, @UserDecorator() user: User) {
    return await this.taskService.getTodoDetail(id, user.id);
  }

  @Delete('todo/:id')
  async deleteTodo(@Param('id') id: number, @UserDecorator() user: User) {
    return await this.taskService.deleteTodoById(id, user.id);
  }

  @Get('todo')
  async getTodos(@Query() dto: SearchTodosDto, @UserDecorator() user: User) {
    return await this.taskService.findTodos(dto, user.id);
  }
}
