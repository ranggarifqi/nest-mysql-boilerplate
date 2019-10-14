import { Injectable, Logger } from '@nestjs/common';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class SeederService {
  constructor (
    private readonly logger: Logger,
    private readonly roleService: RolesService,
    private readonly userService: UsersService,
  ) {}

  async seedAll(): Promise<string> {
    try {
      const roleRes = await this.roleService.seed();
      this.logger.log(roleRes);

      const userRes = await this.userService.seed();
      this.logger.log(userRes);

      return Promise.resolve('Seed Success');
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
