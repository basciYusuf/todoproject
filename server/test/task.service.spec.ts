import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from '../src/task.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Task } from '../src/task.entity';
import { User } from '../src/user/user.entity';

const mockTaskRepo = {
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
};

describe('TaskService', () => {
  let service: TaskService;
  let repo: typeof mockTaskRepo;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TaskService,
        { provide: getRepositoryToken(Task), useValue: mockTaskRepo },
      ],
    }).compile();
    service = module.get<TaskService>(TaskService);
    repo = module.get(getRepositoryToken(Task));
  });

  it('tanımlı olmalı', () => {
    expect(service).toBeDefined();
  });

  it('kullanıcıya ait görevleri getirir', async () => {
    const user = { id: 1 } as User;
    repo.find.mockResolvedValue([{ id: 1, title: 'test', user }]);
    const result = await service.getTasksForUser(user);
    expect(result).toEqual([{ id: 1, title: 'test', user }]);
  });

  it('yeni görev ekler', async () => {
    const user = { id: 1 } as User;
    const task = { id: 1, title: 'yeni görev', user };
    repo.create.mockReturnValue(task);
    repo.save.mockResolvedValue(task);
    const result = await service.addTask('yeni görev', user);
    expect(result).toEqual(task);
  });
}); 