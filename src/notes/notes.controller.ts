import { Controller, Body, Post, UseGuards, Param, Put, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Notes } from './entity/notes.entity';
import { CreateNoteDto } from './dto/createNote.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateNoteDto } from './dto/updateNote.dto';
import { Crud } from '@nestjsx/crud';
import { AclGuard } from '../auth/guards/acl.guard';
import { AllowedRoles } from '../roles/decorators/roles.decorator';

@Crud({
  model: {
    type: Notes
  },
  query: {
    join: {
      author: {
        exclude: ['password']
      }
    }
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
    getManyBase: {
      decorators: [
        AllowedRoles('superadmin', 'admin')
      ]
    },
    getOneBase: {
      decorators: [
        AllowedRoles('superadmin', 'admin')
      ]
    }
  },
  
})
@Controller('notes')
@UseGuards(AuthGuard('jwt'), AclGuard)
export class NotesController {
  constructor (
    public service: NotesService
  ) {}

  @Post()
  @AllowedRoles('superadmin', 'admin')
  async create(@Body() payload: CreateNoteDto): Promise<Notes> {
    return await this.service.create(payload);
  }

  @Put(':id')
  @AllowedRoles('superadmin', 'admin')
  async update(@Param() id: number, @Body() payload: UpdateNoteDto): Promise<Notes> {
    return await this.service.update(id, payload);
  }

  @Delete(':id')
  @AllowedRoles('superadmin', 'admin')
  async delete(@Param() id: number): Promise<Object> {
    return await this.service.delete(id);
  }
}
