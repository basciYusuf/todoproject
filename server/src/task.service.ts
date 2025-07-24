import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskPriority } from './task.entity';
import { User } from './user/user.entity';

interface TaskInput {
  title: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: string;
  tags?: string[];
}

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepo: Repository<Task>,
  ) {}

  // Kullanıcıya ait tüm görevleri getirir
  async getTasksForUser(user: User): Promise<Task[]> {
    return this.taskRepo.find({ where: { user } });
  }

  // Yeni görev ekler
  async addTask(input: TaskInput, user: User): Promise<Task> {
    const task = this.taskRepo.create({ ...input, user });
    return this.taskRepo.save(task);
  }

  // Görev günceller
  async updateTask(id: number, input: TaskInput, user: User): Promise<Task> {
    const task = await this.taskRepo.findOne({ where: { id, user } });
    if (!task) throw new NotFoundException('Görev bulunamadı');
    Object.assign(task, input);
    return this.taskRepo.save(task);
  }

  // Görev tamamlandı bilgisini değiştirir
  async toggleTask(id: number, user: User): Promise<Task> {
    const task = await this.taskRepo.findOne({ where: { id, user } });
    if (!task) throw new NotFoundException('Görev bulunamadı');
    task.completed = !task.completed;
    return this.taskRepo.save(task);
  }

  // Görev siler
  async deleteTask(id: number, user: User): Promise<void> {
    const result = await this.taskRepo.delete({ id, user });
    if (result.affected === 0) throw new NotFoundException('Görev bulunamadı');
  }
} 