import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { Notes } from './entity/notes.entity';
import { CreateNoteDto } from './dto/createNote.dto';
import { UsersService } from '../users/users.service';

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
}
