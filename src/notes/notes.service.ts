import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Notes } from './entity/notes.entity';
import { CreateNoteDto } from './dto/createNote.dto';
import { UsersService } from '../users/users.service';
import { UpdateNoteDto } from './dto/updateNote.dto';
import { Repository } from 'typeorm';

@Injectable()
export class NotesService extends TypeOrmCrudService<Notes> {
  constructor (
    @InjectRepository(Notes)
    private readonly notesRepository: Repository<Notes>,
    private readonly usersService: UsersService
  ) {
    super(notesRepository);
  }

  async create(payload: CreateNoteDto): Promise<Notes> {
    const { userId, ...notePayload } = payload;
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new HttpException('User tidak ditemukan', HttpStatus.BAD_REQUEST);
    }
    let newNote = this.notesRepository.create(notePayload);
    newNote.author = user;
    newNote.deletedAt = null;
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
