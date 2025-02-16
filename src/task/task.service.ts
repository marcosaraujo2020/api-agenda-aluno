import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { Label } from 'src/label/entities/label.entity';
import { Notification } from 'src/notification/entities/notification.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Label)
    private labelRepository: Repository<Label>,
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const user = await this.userRepository.findOne({
      where: { id: createTaskDto.userId },
    });

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const task = this.taskRepository.create({
      ...createTaskDto,
      user,
    });

    if (createTaskDto.labelIds && createTaskDto.labelIds.length > 0) {
      const labels = await this.labelRepository.findBy({
        id: In(createTaskDto.labelIds),
      });
      task.label = labels;
    }

    const savedTask = await this.taskRepository.save(task);

    const notifyIn = new Date(savedTask.date_time);
    notifyIn.setDate(notifyIn.getDate() - 1);

    const notification = this.notificationRepository.create({
      user,
      task: savedTask,
      notify_in: notifyIn,
    });

    await this.notificationRepository.save(notification);

    return savedTask;
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['user', 'label'] });
  }

  async findOne(id: string): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user', 'label'],
    });
    if (!task) {
      throw new HttpException('Tarefa não encontada.', HttpStatus.NOT_FOUND);
    }
    return task;
  }

  async update(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['label'],
    });

    if (!task) {
      throw new HttpException('Tarefa não encontrada.', HttpStatus.NOT_FOUND);
    }

    // Se houver `labelIds` no DTO, busca as etiquetas no banco
    if (updateTaskDto.labelIds) {
      const labels = await this.labelRepository.findBy({
        id: In(updateTaskDto.labelIds),
      });

      if (labels.length !== updateTaskDto.labelIds.length) {
        throw new HttpException(
          'Uma ou mais etiquetas não foram encontradas.',
          HttpStatus.NOT_FOUND,
        );
      }

      task.label = labels; // Substitui as etiquetas atuais pelas novas
    }

    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task);

    /*  const task = await this.findOne(id);
    if (!task) {
      throw new HttpException('Tarefa não encontrada.', HttpStatus.NOT_FOUND);
    }

    Object.assign(task, updateTaskDto);
    return this.taskRepository.save(task); */
  }

  async deleteTask(id: string): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.delete(task);
  }
}
