import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TaskModule } from './task/task.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from '../interceptors/transform.interceptor';

@Module({
  imports: [AuthModule, UserModule, TaskModule],
  controllers: [],
  exports: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class ApiModule {}
