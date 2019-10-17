import { Module, Logger } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UserProfile } from './entities/user-profile.entity';
import { Roles } from '../roles/entities/roles.entity';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, UserProfile, Roles]),
    ConfigModule
  ],
  controllers: [UsersController],
  providers: [UsersService, Logger],
  exports: [UsersService]
})
export class UsersModule {}
