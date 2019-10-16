import { CreateRolesDto } from "./create-roles.dto";

export const defaultRoles: CreateRolesDto[] = [
  {
    name: 'superadmin',
    description: 'Top Level user, bisa kelola admin, dan mempunyai authoritas seperti admin'
  },
  {
    name: 'admin',
    description: 'Kelola user, kelola data'
  },
  {
    name: 'member',
    description: 'Pengguna Aplikasi'
  },
];