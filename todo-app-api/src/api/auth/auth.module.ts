import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UserModule } from '../user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Verification } from '../../entities';
import { jwtConfigConstant } from '../../config';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../../mailgun/mailgun.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Verification]),
    UserModule,
    JwtModule.register({
      global: true,
      ...jwtConfigConstant(),
    }),
    MailModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
