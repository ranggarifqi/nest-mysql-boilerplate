import { Injectable, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { defaultUsers } from './dto/default-users';
import { CreateUserDto } from './dto/user.dto';
import { UserProfile, Gender } from './entities/user-profile.entity';
import { Roles } from '../roles/entities/roles.entity';
import * as bcrypt from 'bcrypt';
import * as md5 from 'md5';
import { MailerService } from '@nest-modules/mailer';
import { ConfigService } from '../config/config.service';
import { NotesService } from '../notes/notes.service';
import { Notes } from '../notes/entity/notes.entity';
import { CreateUserNoteDto } from './dto/create-note.dto';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(UserProfile)
    private readonly profileRepository: Repository<UserProfile>,
    @InjectRepository(Roles)
    private readonly roleRepository: Repository<Roles>,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
    @InjectRepository(Notes)
    private readonly noteRepository: Repository<Notes>
  ) { }

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find({
      select: ['id', 'email', 'username', 'isVerified'],
      relations: ['profile']
    });
  }

  async findById(id: number): Promise<Users> {
    return await this.userRepository.findOne(id, {
      select: ['id', 'email', 'username', 'isVerified'],
      relations: ['profile']
    });
  }

  async findOne(filter: object): Promise<Users> {
    return await this.userRepository.findOne(filter, {
      relations: ['profile', 'roles']
    });
  }

  async create(userDto: CreateUserDto): Promise<Users> {
    try {
      const { profile, role: roleName, ...userPayload } = userDto;

      // Cek apakah rolenya tersedia
      const role = await this.roleRepository.findOne({ name: roleName });

      if (!role) {
        throw new Error('Role tidak tersedia');
      }
      const isAdmin = role.name === 'superadmin' || role.name === 'admin';

      const profilePayload = {
        ...profile,
        gender: profile.gender === 'M' ? Gender.MALE : Gender.FEMALE
      };

      userPayload.password = bcrypt.hashSync(userPayload.password, SALT_ROUNDS);

      const newUser = this.userRepository.create(userPayload);
      newUser.isVerified = isAdmin;
      newUser.verificationToken = !isAdmin ? md5(newUser.email) : null;
      newUser.roles = [role];
      await this.userRepository.save(newUser);

      const newProfile = this.profileRepository.create(profilePayload);
      newProfile.user = newUser;
      await this.profileRepository.save(newProfile);

      // Send Email non blocking
      if (!isAdmin) {
        this.mailerService.sendMail({
          to: newUser.email,
          subject: 'Pendaftaran user baru',
          template: 'userVerification',
          context: {
            verificationLink: `${this.configService.get('BASE_URL')}/users/verify?t=${newUser.verificationToken}`
          }
        })
          .then(() => this.logger.log(`Email verifikasi berhasil dikirim ke ${newUser.email}`))
          .catch((error) => this.logger.error(error));
      }

      return Promise.resolve(newUser);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async verify(verificationToken: string): Promise<boolean> {
    try {
      const user = await this.userRepository.findOne({ verificationToken, isVerified: false });
      if (!user) {
        return Promise.resolve(false);
      }
      user.isVerified = true;
      user.verificationToken = null;
      await this.userRepository.save(user);
      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Notes
  */

  async findAllNotes(userId: number): Promise<Notes[]> {
    const user = await this.userRepository.findOne(userId, {
      relations: ['notes']
    });
    if (!user) throw new HttpException('User tidak ditemukan', HttpStatus.BAD_REQUEST);
    return user.notes;
  }

  async findNoteById(userId: number, noteId: number): Promise<Notes> {
    const note = await this.noteRepository.findOne(noteId, {
      where: { author: { id: userId } }
    });
    if (!note) throw new HttpException('Data tidak ditemukan', HttpStatus.BAD_REQUEST);
    return note;
  }

  async createNote(userId: number, payload: CreateUserNoteDto): Promise<Notes> {
    const author = await this.userRepository.findOne(userId);
    const newNote = this.noteRepository.create(payload);
    newNote.author = author;
    return await this.noteRepository.save(newNote);
  }

  /** */

  //////////////////////

  async seed(): Promise<string> {
    try {
      for (let userDto of defaultUsers) {
        // Cek user apakah sudah ada
        const user = await this.userRepository.findOne({ email: userDto.email });
        if (!user) {
          const newUser = await this.create(userDto);
          this.logger.log(`User ${newUser.email} created`);
        } else {
          this.logger.log(`User ${user.email} already created`)
        }
      }
      return Promise.resolve('Successfully completed seeding users!');
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
