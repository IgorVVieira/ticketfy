import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("events")
export class EventDB {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_id: string;

  @Column()
  name: string;

  @Column("datetime")
  datetime: string;

  @Column({ nullable: true })
  description?: string;

  @Column()
  location: string;

  @Column("int", { default: 0 })
  participants_limit: number;

  @Column("double", { default: 0 })
  unitary_price: number;

  @Column()
  status: string;

  @Column("int", { default: 0 })
  avaliable_tickets: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
