import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './entities/users.entity';
import { Repository } from 'typeorm';
import { defaultUsers } from './dto/default-users';
import { CreateUserDto } from './dto/user.dto';
import { UserProfile, Gender } from './entities/user-profile.entity';
import { Roles } from '../roles/entities/roles.entity';

@Injectable()
export class UsersService {
  constructor (
    private readonly logger: Logger,
    @InjectRepository(Users)
    private readonly userRepository: Repository<Users>,
    @InjectRepository(UserProfile)
    private readonly profileRepository: Repository<UserProfile>,
    @InjectRepository(Roles)
    private readonly roleRepository: Repository<Roles>
  ) {}

  async findAll(): Promise<Users[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<Users> {
    return await this.userRepository.findOne(id);
  }

  async create(userDto: CreateUserDto): Promise<Users> {
    try {
      const { profile, role: roleName, ...userPayload } = userDto;

      // Cek apakah rolenya tersedia
      const role = await this.roleRepository.findOne({ name: roleName });

      if (!role) {
        throw new Error('Role tidak tersedia');
      }

      const profilePayload = {
        ...profile,
        gender: profile.gender === 'M' ? Gender.MALE : Gender.FEMALE
      };

      const newUser = this.userRepository.create(userPayload);
      newUser.isVerified = true;
      newUser.roles = [role];
      await this.userRepository.save(newUser); 

      const newProfile = this.profileRepository.create(profilePayload);
      newProfile.user = newUser;
      await this.profileRepository.save(newProfile);

      return Promise.resolve(newUser);
    } catch (error) {
      return Promise.reject(error);
    }
  }

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