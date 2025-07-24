import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async createUser(username: string, password: string): Promise<User> {
    const existing = await this.userRepo.findOne({ where: { username } });
    if (existing) {
      throw new ConflictException('Bu kullanıcı adı zaten alınmış');
    }

    const user = this.userRepo.create({ username, password });
    return this.userRepo.save(user);
  }

  async findByUsername(username: string): Promise<User | null> {
  return this.userRepo.findOne({ where: { username } });
  }

  async findById(id: number): Promise<User | null> {
  return this.userRepo.findOne({ where: { id } });
 }

}
