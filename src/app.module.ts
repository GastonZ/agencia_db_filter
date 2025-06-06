import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ArticlesModule } from './articles/articles.module';
import { ExcFilesModule } from './exc_files/exc_files.module';

@Module({
  imports: [PrismaModule, ArticlesModule, ExcFilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
