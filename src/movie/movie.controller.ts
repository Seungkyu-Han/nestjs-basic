import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Movie, MovieService } from './movie.service';
@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  postMovie(@Body() movieData: { title: string }): Movie {
    return this.movieService.createMovie(movieData.title);
  }

  @Get('/:id')
  getMovie(@Param('id') id: string): Movie | undefined {
    return this.movieService.getMovieById(parseInt(id));
  }

  @Get()
  getMovies(): Movie[] {
    return this.movieService.getMovies();
  }

  @Patch('/:id')
  patchMovie(
    @Param('id') id: string,
    @Body() movieData: { title: string },
  ): Movie | undefined {
    return this.movieService.updateMovie(parseInt(id), movieData.title);
  }

  @Delete('/:id')
  deleteMovie(@Param('id') id: string): { deleted: boolean } {
    return this.movieService.deleteMovie(parseInt(id));
  }
}
