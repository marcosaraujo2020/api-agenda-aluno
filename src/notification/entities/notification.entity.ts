import { Task } from 'src/task/entities/task.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Notification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.notifications, { onDelete: 'RESTRICT' })
  user: User;

  @ManyToOne(() => Task, { onDelete: 'RESTRICT' })
  task: Task;

  @Column({ type: 'timestamp' })
  notify_in: Date;
}
