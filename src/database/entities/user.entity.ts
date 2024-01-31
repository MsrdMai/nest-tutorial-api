import { Column, Entity, Index } from 'typeorm';
import { CommonColumn } from './common-column';

@Entity('tm_User', { orderBy: { createdDate: 'ASC' } })
export class UserEntity extends CommonColumn {
  @Column({ unique: true, comment: 'email or phoneNumber' })
  userKey: string; // email or phoneNumber

  @Column()
  userEmail: string;

  @Column()
  userType: string;

  @Column({ nullable: true })
  empCode: string; // empCode for internal user

  @Column()
  firstName: string;
  database;

  @Column()
  lastName: string;
}
