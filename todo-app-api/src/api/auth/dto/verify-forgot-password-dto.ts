import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class VerifyForgotPasswordDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  password: string;
}
