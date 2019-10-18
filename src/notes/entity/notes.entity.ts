import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Users } from '../../users/entities/users.entity';
import { ApiModelProperty } from "@nestjs/swagger";

@Entity()
export class Notes {
  @PrimaryGeneratedColumn()
  @ApiModelProperty()
  id: number;

  @Column()
  @ApiModelProperty()
  title: string;

  @Column({
    type: 'text',
    nullable: true
  })
  @ApiModelProperty()
  description: string;

  @CreateDateColumn({
    type: 'datetime',
    default: () => 'NOW()'
  })
  @ApiModelProperty()
  createdAt: Date;
  
  @CreateDateColumn({
    type: 'datetime',
    nullable: true,
    default: () => 'NULL'
  })
  @ApiModelProperty()
  deletedAt: Date;

  @ManyToOne(type => Users, user => user.notes)
  @ApiModelProperty()
  author: Users
}
