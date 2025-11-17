import { Test, TestingModule } from '@nestjs/testing';
import { DirectorController } from './director.controller';
import { DirectorService } from './director.service';
import { CommonEntityModule } from 'src/common/common-entity/common-entity.module';

describe('DirectorController', () => {
  let controller: DirectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectorController],
      providers: [
        DirectorService,
        {
          provide: DirectorService,
          useValue: {},
        },
        {
          provide: CommonEntityModule,
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<DirectorController>(DirectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
