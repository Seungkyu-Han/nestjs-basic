import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entity/movie.entity';
import { CommonEntityModule } from 'src/common/common-entity/common-entity.module';

@Module({
  imports: [TypeOrmModule.forFeature([Movie]), CommonEntityModule],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
