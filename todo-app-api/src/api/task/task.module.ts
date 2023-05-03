import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { Todo } from '../../entities';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
