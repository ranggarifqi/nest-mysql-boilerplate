import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, OneToOne, JoinColumn, OneToMany } from "typeorm";
import { Roles } from "../../roles/entities/roles.entity";
import { UserProfile } from "./user-profile.entity";
import { Notes } from '../../notes/entity/notes.entity';

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

  @OneToMany(type => Notes, note => note.author)
  notes: Notes
}
