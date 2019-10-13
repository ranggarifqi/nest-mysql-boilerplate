import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Users } from "./users.entity";

enum Gender {
  MALE = 'M',
  FEMALE = 'F'
}

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  mobile: string;

  @Column({
    type: 'enum',
    enum: Gender
  })
  gender: Gender

  @Column('text')
  address: string;

  @OneToOne(type => Users, users => users.profile)
  user: Users
}