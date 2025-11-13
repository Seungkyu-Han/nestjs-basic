import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';
import { MovieController } from './movie/movie.controller';

@Module({
  imports: [MovieModule],
  controllers: [MovieController],
  providers: [],
})
export class AppModule {}
