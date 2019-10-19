import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Users } from '../entities/users.entity';
import { Notes } from '../../notes/entity/notes.entity';
import { Repository, IsNull } from 'typeorm';
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
    const notes = await this.noteRepository.find({
      author: { id: userId },
      deletedAt: IsNull()
    })
    return notes;
  }

  async findNoteById(userId: number, noteId: number): Promise<Notes> {
    const note = await this.noteRepository.findOne(noteId, {
      where: { 
        author: { id: userId },
        deletedAt: IsNull(),
      }
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

  async updateNote(userId: number, noteId: number, payload: CreateUserNoteDto): Promise<Notes> {
    const note = await this.noteRepository.findOne(noteId, {
      where: { 
        author: { id: userId },
        deletedAt: IsNull(),
      }
    });
    if (!note) throw new HttpException('Data tidak ditemukan', HttpStatus.BAD_REQUEST);

    await this.noteRepository.update(noteId, payload);
    return await this.noteRepository.findOne(noteId);
  }

  async deleteNote(userId: number, noteId: number): Promise<{ success: boolean, deletedItem: Notes }> {
    const note = await this.noteRepository.findOne(noteId, {
      where: { 
        author: { id: userId },
        deletedAt: IsNull(),
      }
    });
    if (!note) throw new HttpException('Data tidak ditemukan', HttpStatus.BAD_REQUEST);
    await this.noteRepository.update(noteId, { deletedAt: Date() });
    return {
      success: true,
      deletedItem: note
    }
  }
}