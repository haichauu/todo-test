import { BeforeInsert, Column, DeleteDateColumn, Entity, Index } from 'typeorm';
import { BaseModel } from '../base.entity';
import { addDays } from 'date-fns';
import { createBcryptHash } from '../../helpers';
import { generateRandomKey } from '../../helpers/generate-random-key';

export enum VerificationType {
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  VERIFY_EMAIL = 'VERIFY_EMAIL',
}

@Entity()
export class Verification extends BaseModel {
  @Index()
  @Column({ type: 'int' })
  userId: number | null;

  @Column({ type: String })
  token: string;

  @Column({ type: 'varchar', length: 32 })
  type: VerificationType;

  @Column({
    type: 'timestamp',
  })
  expiredAt: Date;

  @BeforeInsert()
  async setExpiredAt() {
    this.expiredAt = addDays(new Date(), 2);
  }

  randomKey?: string;

  @BeforeInsert()
  async setToken() {
    this.randomKey = generateRandomKey();
    this.token = await createBcryptHash(this.randomKey);
  }

  @DeleteDateColumn()
  deletedAt: Date;
}
