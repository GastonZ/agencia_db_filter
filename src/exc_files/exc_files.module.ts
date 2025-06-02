import { Module } from '@nestjs/common';
import { ExcFilesService } from './exc_files.service';
import { ExcFilesController } from './exc_files.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [ExcFilesController],
  providers: [ExcFilesService],
  imports: [PrismaModule]
})
export class ExcFilesModule { }
