import { IsOptional, IsString, IsNumberString, IsArray } from 'class-validator'

export class FilterExcFileDto {
  @IsOptional()
  skip?: string;

  @IsOptional()
  take?: string;

  @IsOptional()
  localidad?: string;

  @IsOptional()
  emailEnviado?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  caracter?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tipoCont?: string[];

  @IsOptional()
  montoAdeudadoDesde?: string;

  @IsOptional()
  montoAdeudadoHasta?: string;

  @IsOptional()
  fecConfirDesde?: string;

  @IsOptional()
  fecConfirHasta?: string;
}
