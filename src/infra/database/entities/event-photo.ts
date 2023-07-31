import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("event_photos")
export class EventPhotoDB {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  event_id: string;

  @Column()
  url: string;

  @CreateDateColumn({ type: "timestamp" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updated_at: Date;
}
