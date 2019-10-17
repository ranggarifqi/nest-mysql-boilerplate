import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Users } from 'src/users/entities/users.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor (
    private readonly usersService: UsersService
  ) {}

  async validateUser(email: string, password: string): Promise<Users> {
    return new Promise(async(resolve, reject) => {
      try {
        const user = this.usersService.findOne({ email });
        if (!user) {
          throw new HttpException('Mohon masukkan email / password yang benar', HttpStatus.UNAUTHORIZED);
        }

        // bcrypt.compare(password, user.);
      } catch (error) {
        return reject(error);
      }
    });
  }
}
