import { Column, CreateDateColumn, Entity, Index } from 'typeorm';
import { CommonColumn } from './common-column';

@Entity('td_UserSession', { orderBy: { createdDate: 'ASC' } })
export class UserSessionEntity extends CommonColumn {
  @Column()
  userKey: string;

  @Column('simple-json')
  permission: any;

  @Column({ length: 'max' })
  accessToken: string;

  @Column({ length: 'max' })
  apiToken: string;

  @Column({ nullable: true })
  platform: string;

  @Column({ nullable: true })
  device: string;

  @Column({ nullable: true })
  version: string;

  @Column()
  issuedDate: Date;

  @Column()
  expireDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @Column({ default: false })
  isLogout: boolean;

  @Column({ nullable: true })
  logoutDate: Date;
}
