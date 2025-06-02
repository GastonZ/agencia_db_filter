import { Test, TestingModule } from '@nestjs/testing';
import { ExcFilesController } from './exc_files.controller';
import { ExcFilesService } from './exc_files.service';

describe('ExcFilesController', () => {
  let controller: ExcFilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExcFilesController],
      providers: [ExcFilesService],
    }).compile();

    controller = module.get<ExcFilesController>(ExcFilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
