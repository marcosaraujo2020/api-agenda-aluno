import {
  ArrayNotEmpty,
  ArrayUnique,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  date_time: Date;

  @IsEnum(['pendente', 'concluída', 'cancelada'], {
    message: "O status deve ser 'pendente', 'concluída' ou 'cancelada'",
  })
  @IsOptional()
  status?: string;

  @IsUUID()
  @IsNotEmpty()
  userId: string;

  @IsOptional()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsUUID('all', { each: true })
  labelIds?: string[];
}
