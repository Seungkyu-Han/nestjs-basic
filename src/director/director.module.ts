import { Module } from '@nestjs/common';
import { DirectorService } from './director.service';
import { DirectorController } from './director.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Director } from './entities/director.entity';
import { CommonEntityModule } from 'src/common/common-entity/common-entity.module';

@Module({
  imports: [TypeOrmModule.forFeature([Director]), CommonEntityModule],
  controllers: [DirectorController],
  providers: [DirectorService],
})
export class DirectorModule {}
