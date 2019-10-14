import { Injectable, Logger } from '@nestjs/common';
import { RolesService } from '../roles/roles.service';

@Injectable()
export class SeederService {
  constructor (
    private readonly logger: Logger,
    private readonly roleService: RolesService,
  ) {}

  async seedAll(): Promise<string> {
    try {
      const roleRes = await this.roleService.seed();
      this.logger.log(roleRes);

      return Promise.resolve('Seed Success');
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
