import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LabelService } from './label.service';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Label } from './entities/label.entity';

@Controller('etiquetas')
export class LabelController {
  constructor(private readonly labelService: LabelService) {}

  @Post()
  create(@Body() createLabelDto: CreateLabelDto): Promise<Label> {
    return this.labelService.create(createLabelDto);
  }

  @Get()
  findAll(): Promise<Label[]> {
    return this.labelService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Label> {
    return this.labelService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLabelDto: UpdateLabelDto,
  ): Promise<Label> {
    return this.labelService.update(id, updateLabelDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.labelService.remove(id);
  }
}
