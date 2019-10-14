import { CreateUserDto } from './user.dto';
export const defaultUsers: CreateUserDto[] = [
  {
    role: 'superadmin',
    username: 'superadmin',
    email: 'superadmin@ranggarifqi.com',
    password: 'superadmin123',
    profile: {
      fullName: 'Super Administrator',
      gender: 'M',
      address: 'Rumah',
      mobile: '1010101010100101010'
    }
  },
  {
    role: 'admin',
    username: 'admin',
    email: 'admin@ranggarifqi.com',
    password: 'admin123',
    profile: {
      fullName: 'Administrator',
      gender: 'M',
      address: 'Rumah',
      mobile: '111110101010101'
    }
  }
];