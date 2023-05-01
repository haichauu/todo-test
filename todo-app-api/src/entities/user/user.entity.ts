import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { BaseModel } from '../base.entity';
import { createBcryptHash } from '../../helpers/bcrypt.helper';

@Entity()
export class User extends BaseModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, unique: true })
  email: string | null;

  @Column({ type: 'boolean', default: false })
  isVerified: boolean;

  @Column({})
  @Exclude({ toPlainOnly: true })
  password: string;

  @BeforeInsert()
  async setPassword() {
    this.password = await createBcryptHash(this.password);
  }

  @DeleteDateColumn()
  deletedAt: Date;
}
