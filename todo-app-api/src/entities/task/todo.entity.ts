import {
  Column,
  DeleteDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BaseModel } from '../base.entity';

@Entity()
export class Todo extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, length: 1024 })
  name: string;

  @Index()
  @Column({ type: 'int' })
  userId: number | null;

  @DeleteDateColumn()
  deletedAt: Date;
}
