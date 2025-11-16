import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  postMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.createMovie(
      createMovieDto.title,
      createMovieDto.genre,
    );
  }

  @Get('/:id')
  getMovie(@Param('id') id: string) {
    return this.movieService.getMovieById(parseInt(id));
  }

  @Get()
  getMovies() {
    return this.movieService.getMovies();
  }

  @Patch()
  patchMovie(@Body() updateMovieDto: UpdateMovieDto) {
    return this.movieService.updateMovie(
      updateMovieDto.id,
      updateMovieDto.title,
      updateMovieDto.genre,
    );
  }

  @Delete('/:id')
  deleteMovie(@Param('id') id: string) {
    return this.movieService.deleteMovie(parseInt(id));
  }
}
