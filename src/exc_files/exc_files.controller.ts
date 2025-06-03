import { Controller, Get, Query, Post, UseInterceptors, BadRequestException, UploadedFile } from '@nestjs/common';
import { ExcFilesService } from './exc_files.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as fs from 'fs';
import { FilterExcFileDto } from './dto/filter-exc-file.dto';


@ApiTags('ExcFiles')
@Controller('exc-files')
export class ExcFilesController {
  constructor(private readonly excFilesService: ExcFilesService) { }

@Get()
findAll(@Query() query: FilterExcFileDto) {
  const parsed = {
    skip: query.skip ? parseInt(query.skip) : 0,
    take: query.take ? parseInt(query.take) : 100,
    localidad: query.localidad || undefined,
    emailEnviado:
      query.emailEnviado === 'true'
        ? true
        : query.emailEnviado === 'false'
        ? false
        : undefined,
    caracter: query.caracter || undefined,
    tipoCont: query.tipoCont || undefined,
    montoAdeudadoDesde: query.montoAdeudadoDesde ? parseFloat(query.montoAdeudadoDesde) : undefined,
    montoAdeudadoHasta: query.montoAdeudadoHasta ? parseFloat(query.montoAdeudadoHasta) : undefined,
    fecConfirDesde: query.fecConfirDesde || undefined,
    fecConfirHasta: query.fecConfirHasta || undefined,
  };

  return this.excFilesService.findAll(parsed);
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