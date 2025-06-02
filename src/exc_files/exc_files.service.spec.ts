import { Test, TestingModule } from '@nestjs/testing';
import { ExcFilesService } from './exc_files.service';

describe('ExcFilesService', () => {
  let service: ExcFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExcFilesService],
    }).compile();

    service = module.get<ExcFilesService>(ExcFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
