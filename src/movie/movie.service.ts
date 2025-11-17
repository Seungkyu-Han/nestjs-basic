import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Movie } from './entity/movie.entity';
import { Repository } from 'typeorm';
import { MovieDetail } from './entity/movie-detail.entity';
import { Director } from 'src/director/entities/director.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
    @InjectRepository(MovieDetail)
    private readonly movieDetailRepository: Repository<MovieDetail>,
    @InjectRepository(Director)
    private readonly directorRepository: Repository<Director>,
  ) {}

  getMovies() {
    return this.movieRepository.find();
  }

  async getMovieById(id: number) {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['movieDetail'],
    });

    if (!movie) {
      return new NotFoundException('Movie not found');
    }

    return movie;
  }

  async createMovie(title: string, genre: string, directorId: number) {
    const director = await this.directorRepository.findOne({
      where: { id: directorId },
    });

    if (!director) {
      throw new NotFoundException('Director not found');
    }

    const movieDetail = this.movieDetailRepository.create({ title, genre });

    const movie = this.movieRepository.create({
      title,
      genre,
      movieDetail,
      director,
    });

    return await this.movieRepository.save(movie);
  }

  async updateMovie(id: number, title: string, genre: string) {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['movieDetail'],
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    await this.movieRepository.update({ id }, { title, genre });

    if (movie.movieDetail) {
      await this.movieDetailRepository.update(
        { id: movie.movieDetail.id },
        { title, genre },
      );
    }

    return this.movieRepository.findOne({ where: { id } });
  }

  async deleteMovie(id: number) {
    const movie = await this.movieRepository.findOne({
      where: { id },
      relations: ['movieDetail'],
    });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    await this.movieRepository.delete({ id });

    if (movie.movieDetail) {
      await this.movieDetailRepository.delete({ id: movie.movieDetail.id });
    }
  }
}
