import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notes } from './entity/notes.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Notes]),
    UsersModule
  ],
  providers: [NotesService],
  controllers: [NotesController]
})
export class NotesModule {}
