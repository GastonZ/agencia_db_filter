import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ExcFilesService {
    constructor(private prisma: PrismaService) { }

    async findAll(params: {
        skip?: number;
        take?: number;
        localidad?: string;
        emailEnviado?: boolean;
    }) {
        const { skip = 0, take = 100, localidad, emailEnviado } = params;

        const where = {
            localidad: localidad ? { contains: localidad, mode: 'insensitive' as const } : undefined,
            emailEnviado: emailEnviado !== undefined ? emailEnviado : undefined,
        };

        const [data, total] = await this.prisma.$transaction([
            this.prisma.excFile.findMany({
                skip,
                take,
                where,
            }),
            this.prisma.excFile.count({ where }),
        ]);

        return { data, total };
    }
}