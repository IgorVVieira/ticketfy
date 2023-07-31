import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("payments")
export class PaymentDB {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  event_id: string;

  @Column()
  user_account_id: string;

  @Column("double", { default: 0 })
  value: number;

  @Column()
  type: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
