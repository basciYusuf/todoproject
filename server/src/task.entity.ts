import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user/user.entity';

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ type: 'enum', enum: TaskPriority, default: TaskPriority.MEDIUM })
  priority: TaskPriority;

  @Column({ type: 'date', nullable: true })
  dueDate?: string;

  @Column('simple-array', { nullable: true })
  tags?: string[];

  @Column({ default: false })
  completed: boolean;

  // Görevin sahibi olan kullanıcı
  @ManyToOne(() => User, { eager: false, onDelete: 'CASCADE' })
  user: User;
} 