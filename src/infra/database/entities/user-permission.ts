import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("user_permissions")
export class UserPermissionDB {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  user_id: string;

  @Column()
  permission_id: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;
}
