import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from "typeorm";
import { Roles } from "../../roles/entities/roles.entity";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    default: false
  })
  isVerified: boolean;

  @Column()
  verificationToken: string;

  @Column({
    type: 'datetime',
    default: () => 'NOW()'
  })
  createdAt: Date

  @ManyToMany(type => Roles, roles => roles.users)
  @JoinTable()
  roles: Roles[]
}