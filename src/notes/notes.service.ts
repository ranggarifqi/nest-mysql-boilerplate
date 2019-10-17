import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions, FindOneOptions } from 'typeorm';
import { Notes } from './entity/notes.entity';
import { CreateNoteDto } from './dto/createNote.dto';
import { UsersService } from '../users/users.service';
import { UpdateNoteDto } from './dto/updateNote.dto';

@Injectable()
export class NotesService {
  constructor (
    @InjectRepository(Notes)
    private readonly notesRepository: Repository<Notes>,
    private readonly usersService: UsersService
  ) {}
  
  async findAll(filter?: FindManyOptions): Promise<Notes[]> {
    return await this.notesRepository.find(filter);
  }

  async findById(id: number, filter?: FindOneOptions): Promise<Notes> {
    return await this.notesRepository.findOne(id, filter);
  }

  async findOne(filter: FindOneOptions): Promise<Notes> {
    return await this.notesRepository.findOne(filter);
  }

  async create(payload: CreateNoteDto): Promise<Notes> {
    const { userId, ...notePayload } = payload;
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new HttpException('User tidak ditemukan', HttpStatus.BAD_REQUEST);
    }
    let newNote = this.notesRepository.create(notePayload);
    newNote.author = user;
    return await this.notesRepository.save(newNote);
  }

  async update(id: number, payload: UpdateNoteDto): Promise<Notes> {
    const note = await this.notesRepository.findOne(id);
    if (!note) {
      throw new HttpException('Data tidak ditemukan', HttpStatus.BAD_REQUEST);
    }
    await this.notesRepository.update(id, payload);
    return await this.notesRepository.findOne(id);
  }

  async delete(id: number): Promise<Object> {
    const note = await this.notesRepository.findOne(id);
    if (!note) {
      throw new HttpException('Data tidak ditemukan', HttpStatus.BAD_REQUEST);
    }
    if (note.deletedAt) {
      throw new HttpException('Data tidak ditemukan', HttpStatus.BAD_REQUEST);
    }
    await this.notesRepository.update(id, { deletedAt: Date() });
    return {
      success: true,
      deletedItem: note
    }
  }
}
