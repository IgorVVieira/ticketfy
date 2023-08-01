import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EventDB } from "./event";
import { UserDB } from "./user";
import { PaymentDB } from "./payment";

@Entity("tickets")
export class TicketDB {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  eventId: string;

  @Column()
  userId: string;

  @Column()
  paymentId: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  @JoinTable({ name: "tickets_events" })
  @ManyToOne(() => EventDB)
  event: EventDB;

  @JoinTable({ name: "tickets_users" })
  @ManyToOne(() => UserDB)
  user: UserDB;

  @JoinTable({ name: "tickets_payments" })
  @ManyToOne(() => PaymentDB)
  payment: PaymentDB;
}
