import { Task } from 'src/task/entities/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Label {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, type: 'varchar', length: 50 })
  name: string;

  @Column({ nullable: true, type: 'varchar', length: 7, default: '#CCCCCC' })
  color: string;

  @ManyToMany(() => Task, (task) => task.label)
  tasks: Task[];
}
