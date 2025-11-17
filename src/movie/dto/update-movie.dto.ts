import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateMovieDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  genre: string;

  @IsString()
  detail: string;
}
