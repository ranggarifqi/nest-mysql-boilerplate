import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Users } from '../../users/entities/users.entity';

@Entity()
export class Roles {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({
    type: 'datetime',
    default: () => 'NOW()'
  })
  createdAt: Date;

  @ManyToMany(type => Users, users => users.roles)
  users: Users[]
}