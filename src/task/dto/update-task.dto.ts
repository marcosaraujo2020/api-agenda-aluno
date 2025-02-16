/* import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {} */
import {
  IsOptional,
  IsUUID,
  ArrayNotEmpty,
  ArrayUnique,
} from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  titulo?: string;

  @IsOptional()
  description?: string;

  @IsOptional()
  status?: string;

  @IsOptional()
  @ArrayNotEmpty()
  @ArrayUnique()
  @IsUUID('all', { each: true })
  labelIds?: string[];
}
