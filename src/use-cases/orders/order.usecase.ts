import { Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/repositorise/order.repository';
import { OrderEntity } from 'src/database/entities/order.entity';
import { OrderRequest } from 'src/core/dtos/request/order.request';

@Injectable()
export class OrderUsecase {
  constructor(private orderRepo: OrderRepository) {}

  async getOrderById(id: string): Promise<OrderEntity> {
    try {
      return await this.orderRepo.getOrderById(id);
    } catch (e) {
      throw e;
    }
  }

  async findAll(
    query: OrderRequest,
  ): Promise<{ orders: OrderEntity[]; total: number }> {
    try {
      return await this.orderRepo.findAll(query);
    } catch (e) {
      throw e;
    }
  }

  async save(product: OrderEntity): Promise<OrderEntity> {
    try {
      return await this.orderRepo.save(product);
    } catch (e) {
      throw e;
    }
  }

  async update(id: string, orderReq: OrderEntity): Promise<OrderEntity> {
    try {
      const order = await this.orderRepo.updateOrder(id, orderReq);
      return order;
    } catch (e) {
      throw e;
    }
  }
  async delete(id: string, user: string): Promise<void> {
    try {
      await this.orderRepo.deleteOrder(id, user);
    } catch (e) {
      throw e;
    }
  }
}
