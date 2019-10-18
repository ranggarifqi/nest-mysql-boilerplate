import { Controller, Get, Param, Post, Body, Query, HttpException, HttpStatus, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AclGuard } from '../auth/guards/acl.guard';
import { AllowedRoles } from '../roles/decorators/roles.decorator';
import { ApiUseTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor (
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService
  ) {}
  
  @Get()
  @UseGuards(AuthGuard('jwt'), AclGuard)
  @AllowedRoles('superadmin', 'admin')
  @ApiBearerAuth()
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
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  async findById(@Param() id: number): Promise<Users> {
    return await this.userService.findById(id);
  }

  @Post()
  async create(@Body() payload: CreateUserDto): Promise<Users> {
    return await this.userService.create(payload);
  }

  @Post('login')
  async login(@Body() payload: LoginDto): Promise<Object> {
    return await this.authService.login(payload);
  }
}
