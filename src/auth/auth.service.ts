import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor (
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(payload: LoginDto): Promise<Object> {
    const { email, password } = payload;
    return new Promise(async(resolve, reject) => {
      try {
        const user = await this.usersService.findOne({ email });
        if (!user) {
          throw new HttpException('Mohon masukkan email / password yang benar', HttpStatus.UNAUTHORIZED);
        }
        if (!user.isVerified) {
          throw new HttpException('Akun anda belum terverifikasi. Mohon cek email anda', HttpStatus.UNAUTHORIZED);
        }

        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) return reject(err);
          if (!isMatch) {
            return reject(new HttpException('Mohon masukkan email / password yang benar', HttpStatus.UNAUTHORIZED));
          }

          // Sign JWT
          const { password: asd, isVerified, verificationToken, createdAt, ...payload } = user;
          const token = this.jwtService.sign(payload);
          return resolve({
            success: true,
            token: `Bearer ${token}`
          });
        });
      } catch (error) {
        return reject(error);
      }
    });
  }
}
