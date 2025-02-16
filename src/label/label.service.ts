import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Label } from './entities/label.entity';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';

@Injectable()
export class LabelService {
  constructor(
    @InjectRepository(Label)
    private labelRepository: Repository<Label>,
  ) {}

  async create(createLabelDto: CreateLabelDto): Promise<Label> {
    const newLabel = this.labelRepository.create({
      name: createLabelDto.name,
      color: createLabelDto.color || '#CCCCCC',
    });

    return this.labelRepository.save(newLabel);
  }

  async findAll(): Promise<Label[]> {
    const label = await this.labelRepository.find({ relations: ['tasks'] });
    if (!label.length) {
      throw new HttpException(
        'Nenhuma etiqueta encontrada.',
        HttpStatus.NOT_FOUND,
      );
    }
    return label;
  }

  async findOne(id: string): Promise<Label> {
    const label = await this.labelRepository.findOne({
      where: { id },
      relations: ['tasks'],
    });

    if (!label) {
      throw new HttpException('Etiqueta não encontada.', HttpStatus.NOT_FOUND);
    }
    return label;
  }

  async update(id: string, updateLabelDto: UpdateLabelDto): Promise<Label> {
    const label = await this.findOne(id);

    Object.assign(label, updateLabelDto);

    return this.labelRepository.save(label);
  }

  async remove(id: string): Promise<void> {
    const label = await this.findOne(id);
    await this.labelRepository.delete(label);
  }
}
