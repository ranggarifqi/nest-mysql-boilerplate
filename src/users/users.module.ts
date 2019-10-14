import { Module, Logger } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { UserProfile } from './entities/user-profile.entity';
import { Roles } from '../roles/entities/roles.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, UserProfile, Roles])
  ],
  controllers: [UsersController],
  providers: [UsersService, Logger]
})
export class UsersModule {}
