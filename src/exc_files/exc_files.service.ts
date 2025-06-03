import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExcFilesService {
  private readonly logger = new Logger(ExcFilesService.name);

  constructor(private prisma: PrismaService) { }

  async findAll(params: {
    skip?: number;
    take?: number;
    localidad?: string;
    emailEnviado?: boolean;
    caracter?: string | string[];
    tipoCont?: string | string[];
    montoAdeudadoDesde?: number;
    montoAdeudadoHasta?: number;
    fecConfirDesde?: string;
    fecConfirHasta?: string;
  }) {
    const {
      skip = 0,
      take = 100,
      localidad,
      emailEnviado,
      caracter,
      tipoCont,
      montoAdeudadoDesde,
      montoAdeudadoHasta,
      fecConfirDesde,
      fecConfirHasta,
    } = params;

    const where = {
      localidad: localidad
        ? { contains: localidad, mode: 'insensitive' as const }
        : undefined,

      emailEnviado: emailEnviado !== undefined ? emailEnviado : undefined,

      caracter: caracter
        ? Array.isArray(caracter)
          ? { in: caracter }
          : { equals: caracter }
        : undefined,

      tipoCont: tipoCont
        ? Array.isArray(tipoCont)
          ? { in: tipoCont }
          : { equals: tipoCont }
        : undefined,

      montoAdeudado:
        montoAdeudadoDesde || montoAdeudadoHasta
          ? {
            gte: montoAdeudadoDesde,
            lte: montoAdeudadoHasta,
          }
          : undefined,

      fecConfir:
        fecConfirDesde || fecConfirHasta
          ? {
            gte: fecConfirDesde ? new Date(fecConfirDesde) : undefined,
            lte: fecConfirHasta ? new Date(fecConfirHasta) : undefined,
          }
          : undefined,
    };

    this.logger.debug(`Parámetros recibidos: ${JSON.stringify(params, null, 2)}`);
    this.logger.debug(`Objeto 'where' para Prisma: ${JSON.stringify(where, null, 2)}`);

    const [data, total, filterValues] = await this.prisma.$transaction([
      this.prisma.excFile.findMany({
        skip,
        take,
        where,
        orderBy: { subida: 'desc' },
      }),
      this.prisma.excFile.count({ where }),
      this.prisma.excFile.findMany({
        select: {
          caracter: true,
          tipoCont: true,
          localidad: true,
        },
        distinct: ['caracter', 'tipoCont', 'localidad'],
        where: {},
      }),
    ]);

    this.logger.debug(`Total resultados: ${total}`);
    this.logger.debug(`Primeros resultados: ${JSON.stringify(data.slice(0, 5), null, 2)}`);

    const filters = {
      caracter: [...new Set(filterValues.map((f) => f.caracter).filter(Boolean))],
      tipoCont: [...new Set(filterValues.map((f) => f.tipoCont).filter(Boolean))],
      localidad: [...new Set(filterValues.map((f) => f.localidad).filter(Boolean))],
    };

    return { data, total, filters };
  }
}