import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';
import { MysqlModule } from './database/mysql.module';

@Module({
  imports: [
    ConfigModule,
    MysqlModule,
    RolesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
