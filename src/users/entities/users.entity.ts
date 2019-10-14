import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn } from "typeorm";
import { Roles } from "../../roles/entities/roles.entity";
import { UserProfile } from "./user-profile.entity";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  password: string;

  @Column({
    default: false
  })
  isVerified: boolean;

  @Column({
    nullable: true,
    default: null,
  })
  verificationToken: string;

  @Column({
    type: 'datetime',
    default: () => 'NOW()'
  })
  createdAt: Date

  @ManyToMany(type => Roles, roles => roles.users)
  @JoinTable()
  roles: Roles[]

  @OneToOne(type => UserProfile, profile => profile.user)
  profile: UserProfile
}