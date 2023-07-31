import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { PaymentEnum } from "../../../domain/entities/payment-enum";

@Entity("user_accounts")
export class UserAccountDB {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_id: string;

  @Column()
  name: string;

  @Column("decimal", { precision: 5, scale: 2, default: 0 })
  amount: number;

  @Column()
  type: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  // @BeforeInsert()
  // @BeforeUpdate()
  // hashPassword() {
  //   this.password = bcrypt.hashSync(this.password, 8);
  // }

  get paymentType(): PaymentEnum {
    return this.type as PaymentEnum;
  }

  set paymentType(type: PaymentEnum) {
    this.type = type;
  }
}
