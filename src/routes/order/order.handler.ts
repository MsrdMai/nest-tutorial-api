import { OrderUsecase } from 'src/use-cases/orders/order.usecase';
import { OrderRequest, CreateOrder } from 'src/core/dtos/request/order.request';
import {
  OrderEntity,
  OrderItemEntity,
} from 'src/database/entities/order.entity';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class OrderHandler {
  constructor(private readonly od: OrderUsecase) {}

  async getList(query: OrderRequest) {
    try {
      // return await this.od.findAll(query);
      const order = (await this.od.findAll(query)) as any;

      const ordersTransform = order.orders?.map((od) => {
        let countAllAmount = 0;
        let countAllQuantity = 0;
        od?.items.map((it) => {
          countAllAmount += it.amount;
          countAllQuantity += it.quantity;
        });

        (od.priceTotal = countAllAmount),
          (od.quantityTotal = countAllQuantity),
          (od.discountInclude =
            countAllAmount - (od.discount / 100) * countAllAmount);
      });

      return order;
    } catch (e) {
      throw e;
    }
  }

  async getById(id: string) {
    try {
      return await this.od.getOrderById(id);
    } catch (e) {
      throw e;
    }
  }

  prefixDate() {
    const currentDate = new Date();
    const day = currentDate.getDate().toString().padStart(2, '0');
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const year = currentDate.getFullYear().toString();
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    const prefixDateStamp = `${day}/${month}/${year}-${hours}:${minutes}:${seconds}`;

    return prefixDateStamp;
  }

  async create(g: CreateOrder) {
    try {
      const { items, discount } = g;

      const order = new OrderEntity();

      order.orderCode = `${'ORDER'.toUpperCase()}#${this.prefixDate()}`;
      order.discount = g.discount;
      order.createdBy = 'Mai';
      order.items = [];
      if (g?.items.length === 0)
        throw new BadRequestException('กรุณาเลือกครายการ');

      g?.items.forEach((pro) => {
        const orderItem = new OrderItemEntity();
        orderItem.productId = pro.productId;
        orderItem.quantity = pro.quantity;
        orderItem.amount = pro.amount;
        orderItem.createdBy = 'Mai';
        order.items.push(orderItem);
      });

      return await this.od.save(order);
    } catch (e) {
      throw e;
    }
  }

  async update(id: string, r: CreateOrder) {
    try {
      const order = await this.od.getOrderById(id);
      if (!order || order === null)
        throw new BadRequestException('ไม่พบ Order ที่ระบุ');

      order.discount = r.discount;
      order.items = [];

      if (r?.items.length === 0)
        throw new BadRequestException('กรุณาเลือกครายการ');

      r?.items.forEach((pro) => {
        const orderItem = new OrderItemEntity();
        orderItem.productId = pro.productId;
        orderItem.quantity = pro.quantity;
        orderItem.amount = pro.amount;
        orderItem.createdBy = 'Mai';
        order.items.push(orderItem);
      });

      order.updatedBy = 'Mai';

      const resp = await this.od.update(id, order);
      return {
        id: resp.id,
      };
    } catch (e) {
      throw e;
    }
  }

  async delete(id: string) {
    try {
      return await this.od.delete(id, 'Mai');
    } catch (e) {
      throw e;
    }
  }
}
