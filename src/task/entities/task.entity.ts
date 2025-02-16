import { Label } from 'src/label/entities/label.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  ManyToOne,
  JoinTable,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'timestamp' })
  date_time: Date;

  @Column({ default: 'pendente' })
  status: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  creation_date: Date;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: 'RESTRICT' })
  user: User;

  @ManyToMany(() => Label, (label) => label.tasks)
  @JoinTable()
  label: Label[];
}
