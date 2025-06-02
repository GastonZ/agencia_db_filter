import { Module } from '@nestjs/common';
import { ExcFilesService } from './exc_files.service';
import { ExcFilesController } from './exc_files.controller';

@Module({
  controllers: [ExcFilesController],
  providers: [ExcFilesService],
})
export class ExcFilesModule {}
