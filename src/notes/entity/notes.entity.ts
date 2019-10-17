import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Users } from '../../users/entities/users.entity';

@Entity()
export class Notes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    type: 'text',
    nullable: true
  })
  description: string;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'NOW()'
  })
  createdAt: Date;
  
  @CreateDateColumn({
    type: 'datetime',
    nullable: true,
    default: () => 'NULL'
  })
  deletedAt: Date;

  @ManyToOne(type => Users, user => user.notes)
  author: Users
}
