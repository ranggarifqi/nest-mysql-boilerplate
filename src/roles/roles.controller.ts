import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';
import { Roles } from './entities/roles.entity';
import { RolesService } from './roles.service';
import { CreateRolesDto } from './dto/create-roles.dto';

@Controller('roles')
export class RolesController {

  constructor (
    private readonly roleService: RolesService
  ) {}

  @Get()
  async findAll(): Promise<Roles[]> {
    return await this.roleService.findAll();
  }

  @Get(':id')
  async findOne(@Param() id: number): Promise<Roles> {
    return await this.roleService.findOne(id);
  }

  @Post()
  async create(@Body() createRolesDto: CreateRolesDto): Promise<Roles> {    
    return await this.roleService.create(createRolesDto);
  }

  @Put(':id')
  async update(@Param() id: number, @Body() payload: CreateRolesDto): Promise<Roles> {
    return await this.roleService.update(id, payload);
  }

  @Delete(':id')
  async delete(@Param() id: number): Promise<Object> {
    return await this.roleService.delete(id);
  }
}
