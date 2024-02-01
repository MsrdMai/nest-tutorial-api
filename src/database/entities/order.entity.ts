import {
  Column,
  Entity,
  Index,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CommonColumn } from './common-column';
import { ProductEntity } from './product.entity';

@Entity('tm_Order', { orderBy: { createdDate: 'ASC' } })
@Index(['id', 'orderCode'])
export class OrderEntity extends CommonColumn {
  @Column()
  orderCode: string;

  @Column({ nullable: true, default: false })
  discount: number;

  /* Relations */
  /* with PlanItem */
  @OneToMany(() => OrderItemEntity, (item) => item.order, {
    cascade: ['insert', 'update', 'remove'],
  })
  items: OrderItemEntity[];
}

@Entity('tm_Order_item', { orderBy: { createdDate: 'ASC' } })
@Index(['id', 'order', 'productId'])
export class OrderItemEntity extends CommonColumn {
  @Column()
  productId: string;

  @ManyToOne(() => OrderEntity, (order) => order.items)
  @JoinColumn({ name: 'orderId' })
  order: OrderEntity[];

  @Column()
  quantity: number;

  @Column()
  amount: number;
}
