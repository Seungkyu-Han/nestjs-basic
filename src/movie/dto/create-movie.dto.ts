import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsNotEmpty()
  @IsOptional()
  title: string;

  @IsNotEmpty()
  @IsOptional()
  genre: string;

  @IsString()
  detail: string;

  @IsNumber()
  @IsNotEmpty()
  directorId: number;
}
