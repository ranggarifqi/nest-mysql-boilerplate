import { Module, Logger } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { RolesModule } from '../roles/roles.module';
import { RolesService } from '../roles/roles.service';
import { MysqlModule } from '../database/mysql.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from '../roles/entities/roles.entity';
import { UsersModule } from '../users/users.module';
import { Users } from '../users/entities/users.entity';
import { UserProfile } from '../users/entities/user-profile.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    RolesModule,
    UsersModule,
    MysqlModule,
    TypeOrmModule.forFeature([Roles, Users, UserProfile])
  ],
  providers: [Logger, SeederService, RolesService, UsersService]
})
export class SeederModule {}
