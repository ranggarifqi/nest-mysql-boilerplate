import { Controller, Get, Param, Post, Body, Query, HttpException, HttpStatus, Res, UseGuards, Put, Delete } from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { Users } from './entities/users.entity';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { ConfigService } from '../config/config.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AclGuard } from '../auth/guards/acl.guard';
import { AllowedRoles } from '../roles/decorators/roles.decorator';
import { ApiUseTags, ApiBearerAuth, ApiImplicitParam } from '@nestjs/swagger';
import { Notes } from 'src/notes/entity/notes.entity';
import { CreateUserNoteDto } from './dto/create-note.dto';
import { UserNoteService } from './services/user-notes.service';

@ApiUseTags('users')
@Controller('users')
export class UsersController {
  constructor (
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
    private readonly userNoteService: UserNoteService
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
  async findById(@Param('id') id: number): Promise<Users> {
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

  /**
   * Notes
   */
  @Get(':id/notes')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiImplicitParam({ name: 'id', required: true })
  async findAllNotes(@Param('id') id: number): Promise<Notes[]> {
    return await this.userNoteService.findAllNotes(id);
  }

  @Get(':id/notes/:noteId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiImplicitParam({ name: 'id', required: true })
  @ApiImplicitParam({ name: 'noteId', required: true })
  async findNoteById(@Param('id') id: number, @Param('noteId') noteId: number): Promise<Notes> {
    return await this.userNoteService.findNoteById(id, noteId);
  }

  @Post(':id/notes')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiImplicitParam({ name: 'id', required: true })
  async createNote(@Param('id') id: number, @Body() payload: CreateUserNoteDto): Promise<Notes> {
    return await this.userNoteService.createNote(id, payload);
  }
  
  @Put(':id/notes/:noteId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiImplicitParam({ name: 'id', required: true })
  @ApiImplicitParam({ name: 'noteId', required: true })
  async updateNote(@Param('id') id: number, @Param('noteId') noteId: number, @Body() payload: CreateUserNoteDto): Promise<Notes> {
    return await this.userNoteService.updateNote(id, noteId, payload);
  }

  @Delete(':id/notes/:noteId')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiImplicitParam({ name: 'id', required: true })
  @ApiImplicitParam({ name: 'noteId', required: true })
  async deleteNote(@Param('id') id: number, @Param('noteId') noteId: number): Promise<{success: boolean, deletedItem: Notes}> {
    return this.userNoteService.deleteNote(id, noteId);
  }
}
