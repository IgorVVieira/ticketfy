import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EventStatus } from "../../../domain/entities/events/event";

@Entity("events")
export class EventDB {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  name: string;

  @Column("timestamp")
  datetime: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  location: string;

  @Column("int", { default: 0 })
  participants_limit: number;

  @Column("decimal", { default: 0 })
  unitary_price: number;

  @Column()
  status: string;

  @Column("int", { default: 0 })
  avaliable_tickets: number;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;

  get eventStatus(): EventStatus {
    return this.status as EventStatus;
  }

  set eventStatus(status: EventStatus) {
    this.status = status;
  }
}
