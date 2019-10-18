import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { Roles } from './entities/roles.entity';
import { RolesService } from './roles.service';
import { CreateRolesDto } from './dto/create-roles.dto';
import { AuthGuard } from '@nestjs/passport';
import { AclGuard } from '../auth/guards/acl.guard';
import { AllowedRoles } from './decorators/roles.decorator';
import { ApiUseTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiUseTags('roles')
@ApiBearerAuth()
@Controller('roles')
@UseGuards(AuthGuard('jwt'), AclGuard)
export class RolesController {

  constructor (
    private readonly roleService: RolesService
  ) {}

  @Get()
  @ApiOperation({ title: 'Lihat semua role', description: 'Hanya superadmin yang bisa akses' })
  async findAll(): Promise<Roles[]> {
    return await this.roleService.findAll();
  }

  @Get(':id')
  @ApiOperation({ title: 'Lihat role by id', description: 'Hanya superadmin yang bisa akses' })
  async findOne(@Param() id: number): Promise<Roles> {
    return await this.roleService.findOne(id);
  }

  @Post()
  @AllowedRoles('superadmin')
  @ApiOperation({ title: 'Tambah role baru', description: 'Hanya superadmin yang bisa akses' })
  async create(@Body() createRolesDto: CreateRolesDto): Promise<Roles> {    
    return await this.roleService.create(createRolesDto);
  }

  @Put(':id')
  @AllowedRoles('superadmin')
  @ApiOperation({ title: 'Update role by id', description: 'Hanya superadmin yang bisa akses' })
  async update(@Param() id: number, @Body() payload: CreateRolesDto): Promise<Roles> {
    return await this.roleService.update(id, payload);
  }

  @Delete(':id')
  @AllowedRoles('superadmin')
  @ApiOperation({ title: 'Delete role by id', description: 'Hanya superadmin yang bisa akses' })
  async delete(@Param() id: number): Promise<Object> {
    return await this.roleService.delete(id);
  }
}
