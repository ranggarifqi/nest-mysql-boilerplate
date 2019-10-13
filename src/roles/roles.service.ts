import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Roles } from './entities/roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRolesDto } from './dto/create-roles.dto';

@Injectable()
export class RolesService {
  constructor (
    @InjectRepository(Roles)
    private readonly roleRepository: Repository<Roles>
  ) {}

  async findAll(): Promise<Roles[]> {
    return await this.roleRepository.find();
  }

  async findOne(id: number): Promise<Roles> {
    return await this.roleRepository.findOne(id);
  }
  
  async create(payload: CreateRolesDto): Promise<Roles> {
    const newRole = this.roleRepository.create(payload);
    return await this.roleRepository.save(newRole);
  }

  async update(id: number, payload: CreateRolesDto): Promise<Roles> {
    await this.roleRepository.update(id, payload);
    const updatedData = await this.roleRepository.findOne(id);
    return updatedData;
  }

  async delete(id: number): Promise<Object> {
    await this.roleRepository.delete(id);
    return {
      success: true
    }
  }
}
