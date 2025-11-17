import { Test, TestingModule } from '@nestjs/testing';
import { DirectorService } from './director.service';
import { Director } from './entities/director.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('DirectorService', () => {
  let service: DirectorService;
  // Repository Mock
  const mockDirectorRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DirectorService,
        {
          provide: getRepositoryToken(Director),
          useValue: mockDirectorRepository,
        },
      ],
    }).compile();

    service = module.get<DirectorService>(DirectorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
