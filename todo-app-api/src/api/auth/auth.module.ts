import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules
import { MailModule } from '../../mailgun/mailgun.module';
import { UserModule } from '../user/user.module';

// Services
import { AuthService } from './auth.service';

// Controllers
import { AuthController } from './auth.controller';

// Configs
import { jwtConfigConstant } from '../../config';

// Models
import { Verification } from '../../entities';

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
