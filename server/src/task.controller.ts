import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Put,
  Body,
  Param,
  UseGuards,
  Request,
  ParseIntPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { JwtAuthGuard } from '././auth/jwt-auth.guard';
import { TaskPriority } from './task.entity';

class TaskDto {
  title: string;
  description?: string;
  priority?: TaskPriority;
  dueDate?: string;
  tags?: string[];
}

@Controller('api/tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  // Kullanıcının görevlerini getirir
  @Get()
  getTasks(@Request() req) {
    return this.taskService.getTasksForUser(req.user);
  }

  // Yeni görev ekler
  @Post()
  addTask(@Body() dto: TaskDto, @Request() req) {
    return this.taskService.addTask(dto, req.user);
  }

  // Görev günceller
  @Put(':id')
  updateTask(@Param('id', ParseIntPipe) id: number, @Body() dto: TaskDto, @Request() req) {
    return this.taskService.updateTask(id, dto, req.user);
  }

  // Görev tamamlandı bilgisini değiştirir
  @Patch(':id/toggle')
  toggleTask(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.taskService.toggleTask(id, req.user);
  }

  // Görev siler
  @Delete(':id')
  deleteTask(@Param('id', ParseIntPipe) id: number, @Request() req) {
    return this.taskService.deleteTask(id, req.user);
  }
} 