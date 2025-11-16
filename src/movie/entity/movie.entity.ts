import { BaseEntity } from 'src/common/common-entity/base-entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MovieDetail } from './movie-detail.entity';

@Entity('movies')
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  genre: string;

  @OneToOne(() => MovieDetail, (detail) => detail.movie)
  @JoinColumn()
  movieDetail: MovieDetail;
}
