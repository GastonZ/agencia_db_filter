import { IsOptional, IsString, IsNumberString } from 'class-validator'

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
  caracter?: string;

  @IsOptional()
  tipoCont?: string;

  @IsOptional()
  montoAdeudadoDesde?: string;

  @IsOptional()
  montoAdeudadoHasta?: string;

  @IsOptional()
  fecConfirDesde?: string;

  @IsOptional()
  fecConfirHasta?: string;
}
