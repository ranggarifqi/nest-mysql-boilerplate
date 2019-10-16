import { Injectable, Logger } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Roles } from './entities/roles.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateRolesDto } from './dto/create-roles.dto';
import { defaultRoles } from './dto/default-roles';

@Injectable()
export class RolesService {
  constructor (
    private readonly logger: Logger,
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

  /////////////////////////////

  async seed(): Promise<string> {
    try {
      for (let roleDto of defaultRoles) {
        const role = await this.roleRepository.findOne({ name: roleDto.name });
        if (!role) {
          const newRole = this.roleRepository.create(roleDto);
          await this.roleRepository.save(newRole);
          this.logger.log(`Role created: ${newRole.name}`);
        } else {
          this.logger.log(`Role already created: ${role.name}`);
        }
      }
      return Promise.resolve('Successfully completed seeding roles!');
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
