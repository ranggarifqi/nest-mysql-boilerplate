import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(Users)
    private readonly repository: Repository<Users>
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Users> {
    return await this.repository.findOne(id);
  }
}
