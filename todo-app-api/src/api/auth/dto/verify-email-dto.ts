import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class VerifyEmailDto {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsNumber()
  id: number;
}
