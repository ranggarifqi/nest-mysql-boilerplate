import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { Users } from "./users.entity";

export enum Gender {
  MALE = 'M',
  FEMALE = 'F'
}

@Entity()
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({
    type: 'enum',
    enum: Gender,
    default: Gender.MALE
  })
  gender: Gender

  @Column({
    type: 'text',
    nullable: true
  })
  address: string;

  @OneToOne(type => Users, users => users.profile, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: Users
}