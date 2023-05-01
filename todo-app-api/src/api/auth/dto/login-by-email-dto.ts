import { lowerCaseTransformer } from '../../../utils/transformers/lower-case.transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginByEmailDto {
  @IsNotEmpty()
  @IsString()
  @Transform(lowerCaseTransformer)
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
