import { Controller, Get, Query, HttpStatus, HttpException, Body, Post, UseGuards, Param, Put, Delete } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Notes } from './entity/notes.entity';
import { CreateNoteDto } from './dto/createNote.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateNoteDto } from './dto/updateNote.dto';
import { Crud } from '@nestjsx/crud';

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
        UseGuards(AuthGuard('jwt'))
      ]
    },
    getOneBase: {
      decorators: [
        UseGuards(AuthGuard('jwt'))
      ]
    }
  },
  
})
@Controller('notes')
export class NotesController {
  constructor (
    public service: NotesService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() payload: CreateNoteDto): Promise<Notes> {
    return await this.service.create(payload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param() id: number, @Body() payload: UpdateNoteDto): Promise<Notes> {
    return await this.service.update(id, payload);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async delete(@Param() id: number): Promise<Object> {
    return await this.service.delete(id);
  }
}
