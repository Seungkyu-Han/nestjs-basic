import { Injectable } from '@nestjs/common';

export interface Movie {
  id: number;
  title: string;
  genre: string;
}

@Injectable()
export class MovieService {
  private counter = 3;

  private movies: Movie[];

  constructor() {
    this.movies = [
      {
        id: 1,
        title: 'Inception',
        genre: 'fantasy',
      },
      {
        id: 2,
        title: 'The Matrix',
        genre: 'action',
      },
      {
        id: 3,
        title: 'Interstellar',
        genre: 'sci-fi',
      },
    ];
  }

  getMovies(): Movie[] {
    return this.movies;
  }

  getMovieById(id: number): Movie | undefined {
    return this.movies.find((movie) => movie.id === id);
  }

  createMovie(title: string, genre: string): Movie {
    this.counter++;
    const newMovie: Movie = {
      id: this.counter,
      title: title,
      genre: genre,
    };
    this.movies.push(newMovie);
    return newMovie;
  }

  updateMovie(id: number, title: string, genre: string): Movie | undefined {
    const movie = this.movies.find((movie) => movie.id === id);
    if (movie) {
      movie.title = title;
      movie.genre = genre;
    }
    return movie;
  }

  deleteMovie(id: number): { deleted: boolean } {
    const index = this.movies.findIndex((movie) => movie.id === id);
    if (index !== -1) {
      this.movies.splice(index, 1);
      return { deleted: true };
    }
    return { deleted: false };
  }
}
