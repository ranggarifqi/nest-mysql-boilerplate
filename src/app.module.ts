import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { MysqlModule } from './database/mysql.module';
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    ConfigModule,
    MysqlModule,
    RolesModule,
    UsersModule,
    MailModule,
    AuthModule,
    NotesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
