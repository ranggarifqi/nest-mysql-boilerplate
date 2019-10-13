import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}