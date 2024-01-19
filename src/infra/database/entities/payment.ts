import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { PaymentEnum } from '../../../domain/entities/payment-enum';

@Entity('payments')
export class PaymentDB {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  eventId: string;

  @Column()
  userAccountId: string;

  @Column('decimal', { default: 0 })
  value: number;

  @Column()
  type: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  get paymentType(): PaymentEnum {
    return this.type as PaymentEnum;
  }

  set paymentType(type: PaymentEnum) {
    this.type = type;
  }
}
