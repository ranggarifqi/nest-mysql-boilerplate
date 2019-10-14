import { Module, Logger } from '@nestjs/common';
import { SeederService } from './seeder.service';
import { RolesModule } from '../roles/roles.module';
import { RolesService } from '../roles/roles.service';
import { MysqlModule } from '../database/mysql.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Roles } from '../roles/entities/roles.entity';

@Module({
  imports: [
    RolesModule,
    MysqlModule,
    TypeOrmModule.forFeature([Roles])
  ],
  providers: [Logger, SeederService, RolesService]
})
export class SeederModule {}
