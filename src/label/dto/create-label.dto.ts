import { IsString, IsOptional } from 'class-validator';

export class CreateLabelDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  color?: string;
}
