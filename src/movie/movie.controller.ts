import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

interface Movie {
  id: number;
  title: string;
}
@Controller('movie')
export class MovieController {
  private movies: Movie[];

  constructor() {
    this.movies = [
      {
        id: 1,
        title: 'Inception',
      },
      {
        id: 2,
        title: 'The Matrix',
      },
      {
        id: 3,
        title: 'Interstellar',
      },
    ];
  }

  private counter = 3;

  @Post()
  postMovie(@Body() movieData: { title: string }): Movie {
    this.counter++;
    const newMovie: Movie = {
      id: this.counter,
      title: movieData.title,
    };
    this.movies.push(newMovie);
    return newMovie;
  }
  @Get('/:id')
  getMovie(@Param('id') id: string): Movie | undefined {
    return this.movies.find((movie) => movie.id === parseInt(id));
  }

  @Get()
  getMovies(): Movie[] {
    return this.movies;
  }

  @Patch('/:id')
  patchMovie(
    @Param('id') id: string,
    @Body() movieData: { title: string },
  ): Movie | undefined {
    const movie = this.movies.find((movie) => movie.id === parseInt(id));
    if (movie) {
      movie.title = movieData.title;
    }
    return movie;
  }
}
