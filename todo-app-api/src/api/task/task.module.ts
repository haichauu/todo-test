import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
