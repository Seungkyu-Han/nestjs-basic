import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Movie } from './movie.entity';

@Entity()
export class MovieDetail extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  genre: string;

  @OneToOne(() => Movie, (movie) => movie.movieDetail)
  movie: Movie;
}
