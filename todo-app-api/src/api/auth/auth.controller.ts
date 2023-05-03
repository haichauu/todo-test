import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';

// Services
import { AuthService } from './auth.service';

// Dtos
import {
  ForgotPasswordDto,
  VerifyEmailDto,
  VerifyForgotPasswordDto,
  LoginByEmailDto,
  RegisterUserByEmailDto,
} from './dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(forgotPasswordDto.email);
  }

  @Post('forgot-password/verify')
  @UseInterceptors(ClassSerializerInterceptor)
  async verifyForgotPassword(@Body() dto: VerifyForgotPasswordDto) {
    return await this.authService.verifyForgotPassword(dto);
  }

  @Post('email/login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() dto: LoginByEmailDto) {
    return await this.authService.loginByEmail(dto);
  }

  @Post('email/register')
  @UseInterceptors(ClassSerializerInterceptor)
  async createUser(@Body() dto: RegisterUserByEmailDto) {
    return await this.authService.registerUserByEmail(dto);
  }

  @Post('email/verify')
  async verifyEmail(@Body() dto: VerifyEmailDto) {
    return await this.authService.verifyEmail(dto);
  }
}
