export class CreateUserProfileDto {
  readonly fullName: string;
  readonly mobile?: string;
  readonly gender?: string;
  readonly address?: string; 
}

export class CreateUserDto {
  readonly role: string;
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly profile: CreateUserProfileDto;
}