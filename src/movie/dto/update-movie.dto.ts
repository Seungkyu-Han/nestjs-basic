import { IsNotEmpty } from 'class-validator';

export class UpdateMovieDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  genre: string;
}
