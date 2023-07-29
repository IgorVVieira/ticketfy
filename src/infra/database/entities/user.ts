import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class UserDB {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  picture?: string;

  // @BeforeInsert()
  // @BeforeUpdate()
  // hashPassword() {
  //   this.password = bcrypt.hashSync(this.password, 8);
  // }
}
