import { Controller, Get, Param, Post, Body, Query, HttpException, HttpStatus, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { CreateUserDto } from './dto/user.dto';
import { ConfigService } from '../config/config.service';

@Controller('users')
export class UsersController {
  constructor (
    private readonly userService: UsersService,
    private readonly configService: ConfigService
  ) {}

  @Get()
  async findAll(): Promise<Users[]> {
    return await this.userService.findAll();
  }

  @Get('verify')
  async verifyUser(@Query('t') t, @Res() res: Response) {
    if (!t) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }
    const isValid = await this.userService.verify(t);
    if (!isValid) {
      throw new HttpException('Invalid token', HttpStatus.BAD_REQUEST);
    }

    return res.redirect(this.configService.get('VERIFY_REDIRECT_URL'));
  }

  @Get(':id')
  async findOne(@Param() id: number): Promise<Users> {
    return await this.userService.findOne(id);
  }

  @Post()
  async create(@Body() payload: CreateUserDto): Promise<Users> {
    return await this.userService.create(payload);
  }
}
