import { CommonColumn } from './common-column';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'tm_Group' })
export class GroupEntity extends CommonColumn {
  @Column()
  groupName: string;

  @Column({ nullable: true })
  remark: string;
}
