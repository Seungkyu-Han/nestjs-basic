import { Module } from '@nestjs/common';
import { CommonEntityModule } from './common-entity/common-entity.module';

@Module({
  imports: [CommonEntityModule],
})
export class CommonModule {}
