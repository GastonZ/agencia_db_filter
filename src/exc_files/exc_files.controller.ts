import { Controller, Get, Query, Post, UseInterceptors, BadRequestException, UploadedFile } from '@nestjs/common';
import { ExcFilesService } from './exc_files.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';


@ApiTags('ExcFiles')
@Controller('exc-files')
export class ExcFilesController {
  constructor(private readonly excFilesService: ExcFilesService) { }

  @Get()
  @ApiQuery({ name: 'skip', required: false, example: 0 })
  @ApiQuery({ name: 'take', required: false, example: 100 })
  @ApiQuery({ name: 'localidad', required: false, example: 'Rosario' })
  @ApiQuery({ name: 'emailEnviado', required: false, type: Boolean })
  findAll(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('localidad') localidad?: string,
    @Query('emailEnviado') emailEnviado?: string,
  ) {
    return this.excFilesService.findAll({
      skip: skip ? parseInt(skip) : 0,
      take: take ? parseInt(take) : 100,
      localidad,
      emailEnviado: emailEnviado === 'true' ? true : emailEnviado === 'false' ? false : undefined,
    });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const uploadPath = process.env.EXCEL_UPLOAD_PATH || './uploads/excels';
        if (!fs.existsSync(uploadPath)) {
          fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (!file.originalname.match(/\.(xlsx|xls)$/)) {
        return cb(new BadRequestException('Solo se permiten archivos Excel'), false);
      }
      cb(null, true);
    },
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Archivo no proporcionado');
    }

    return {
      message: 'Archivo recibido exitosamente',
      filename: file.filename,
      path: file.path,
    };
  }
}