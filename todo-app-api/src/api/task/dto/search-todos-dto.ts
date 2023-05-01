import { IsDate, IsOptional, IsString, MaxLength } from 'class-validator';

export class SearchTodosDto {
  @IsOptional()
  @IsString()
  @MaxLength(1024)
  name: string;

  @IsOptional()
  @IsDate()
  date: Date;
}
