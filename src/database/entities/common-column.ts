import {
  BaseEntity,
  BeforeInsert,
  BeforeSoftRemove,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export abstract class CommonColumn extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: true,
  })
  isActive: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @Column()
  createdBy: string;

  @UpdateDateColumn({ nullable: true })
  updatedDate: Date;

  @Column({ nullable: true })
  updatedBy: string;

  @DeleteDateColumn({ nullable: true })
  deletedDate: Date;

  @Column({ nullable: true })
  deletedBy: string;

  @BeforeInsert()
  onBeforeInsert() {
    this.createdDate = new Date();
  }

  @BeforeUpdate()
  onBeforeUpdate() {
    this.updatedDate = new Date();
  }

  @BeforeSoftRemove()
  onSoftRemove() {
    this.deletedDate = new Date();
  }
}
