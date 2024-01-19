import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { PermissionDB } from './permission';

@Entity('user_permissions')
export class UserPermissionDB {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  permissionId: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @JoinTable({ name: 'user_permissions_permissions' })
  @ManyToOne(() => PermissionDB)
  permission: PermissionDB;
}
