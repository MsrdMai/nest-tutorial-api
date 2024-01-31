import { Column, Entity, Index, ManyToOne, JoinColumn } from 'typeorm';
import { CommonColumn } from './common-column';
import { GroupEntity } from './group.entity';

@Entity('tm_Product', { orderBy: { createdDate: 'ASC' } })
export class ProductEntity extends CommonColumn {
  @Column()
  productName: string;

  @Column({ nullable: true })
  discrption: string;

  @Column()
  price: number;

  @Column()
  inStock: number;

  @ManyToOne(() => GroupEntity, (group) => group.id, {
    eager: true,
  })
  @JoinColumn({ name: 'factoryId' })
  group: GroupEntity;
}
