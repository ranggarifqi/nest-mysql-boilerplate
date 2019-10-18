import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from '../entities/users.entity';
import { Notes } from '../../notes/entity/notes.entity';
import { Repository } from 'typeorm';
import { CreateUserNoteDto } from '../dto/create-note.dto';

@Injectable()
export class UserNoteService {
  constructor (
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    
    @InjectRepository(Notes)
    private readonly noteRepository: Repository<Notes>
  ) {}

  async findAllNotes(userId: number): Promise<Notes[]> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['notes']
    });
    if (!user) throw new HttpException('User tidak ditemukan', HttpStatus.BAD_REQUEST);
    return user.notes;
  }

  async findNoteById(userId: number, noteId: number): Promise<Notes> {
    const note = await this.noteRepository.findOne(noteId, {
      where: { author: { id: userId } }
    });
    if (!note) throw new HttpException('Data tidak ditemukan', HttpStatus.BAD_REQUEST);
    return note;
  }

  async createNote(userId: number, payload: CreateUserNoteDto): Promise<Notes> {
    const author = await this.userRepository.findOne(userId);
    const newNote = this.noteRepository.create(payload);
    newNote.author = author;
    return await this.noteRepository.save(newNote);
  }
}