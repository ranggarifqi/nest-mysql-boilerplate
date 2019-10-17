import { Controller, Get, Query, HttpStatus, HttpException, Body, Post, UseGuards, Param } from '@nestjs/common';
import { NotesService } from './notes.service';
import { Notes } from './entity/notes.entity';
import { CreateNoteDto } from './dto/createNote.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('notes')
export class NotesController {
  constructor (
    private readonly notesService: NotesService
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(@Query('filter') filter): Promise<Notes[]> {
    let parsedFilter = filter;
    if (typeof filter === 'string') {
      try {
        parsedFilter = JSON.parse(filter);
      } catch (error) {
        throw new HttpException('filter harus berupa JSON String atau Object', HttpStatus.BAD_REQUEST);
      }
    }
    return await this.notesService.findAll(parsedFilter);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('findOne')
  async findOne(@Query('filter') filter): Promise<Notes> {
    let parsedFilter = filter;
    if (typeof filter === 'string') {
      try {
        parsedFilter = JSON.parse(filter);
      } catch (error) {
        throw new HttpException('filter harus berupa JSON String atau Object', HttpStatus.BAD_REQUEST);
      }
    }
    const note = await this.notesService.findOne(parsedFilter);
    if (!note) {
      throw new HttpException('Data tidak ditemukan', HttpStatus.BAD_REQUEST);
    }
    return note;
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findById(@Param() id: number, @Query('filter') filter): Promise<Notes> {
    let parsedFilter = filter;
    if (typeof filter === 'string') {
      try {
        parsedFilter = JSON.parse(filter);
      } catch (error) {
        throw new HttpException('filter harus berupa JSON String atau Object', HttpStatus.BAD_REQUEST);
      }
    }
    const note = await this.notesService.findById(id, parsedFilter);
    if (!note) {
      throw new HttpException('Data tidak ditemukan', HttpStatus.BAD_REQUEST);
    }
    return note;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() payload: CreateNoteDto): Promise<Notes> {
    return await this.notesService.create(payload);
  }
}
