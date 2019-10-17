import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
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

  @Column({
    type: 'datetime',
    default: () => 'NOW()'
  })
  createdAt: Date;
  
  @Column({
    type: 'datetime',
    nullable: true
  })
  deletedAt: Date;

  @ManyToOne(type => Users, user => user.notes)
  author: Users
}
