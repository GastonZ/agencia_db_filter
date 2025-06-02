import { Controller, Get, Query } from '@nestjs/common';
import { ExcFilesService } from './exc_files.service';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('ExcFiles')
@Controller('exc-files')
export class ExcFilesController {
  constructor(private readonly excFilesService: ExcFilesService) {}

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
}