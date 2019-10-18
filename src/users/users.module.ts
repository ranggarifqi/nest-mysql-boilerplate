import { Module, Logger, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UserProfile } from './entities/user-profile.entity';
import { Roles } from '../roles/entities/roles.entity';
import { ConfigModule } from '../config/config.module';
import { AuthModule } from '../auth/auth.module';
import { NotesModule } from '../notes/notes.module';
import { Notes } from '../notes/entity/notes.entity';
import { NotesService } from '../notes/notes.service';
import { UserNoteService } from './services/user-notes.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, UserProfile, Roles, Notes]),
    ConfigModule,
    forwardRef(() => AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersService, UserNoteService, Logger],
  exports: [UsersService]
})
export class UsersModule {}
