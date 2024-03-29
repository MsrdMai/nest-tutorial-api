import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { ProductEntity } from 'src/database/entities/product.entity';
import { OrderEntity } from 'src/database/entities/order.entity';
import { OrderRequest, CreateOrder } from 'src/core/dtos/request/order.request';
import { GroupEntity } from 'src/database/entities/group.entity';

export interface IOrderRepo {
  getOrderById(id: string): Promise<OrderEntity>;
  save(order: OrderEntity): Promise<OrderEntity>;
  findAll(
    query: OrderRequest,
  ): Promise<{ orders: OrderEntity[]; total: number }>;
}

@Injectable()
export class OrderRepository implements IOrderRepo {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly Order: Repository<OrderEntity>,
  ) {}

  async findAll(
    query: OrderRequest,
  ): Promise<{ orders: OrderEntity[]; total: number }> {
    try {
      const { search, searchBy, sort, sortBy, page, perPage } = query;

      const [orders, total] = await this.Order.createQueryBuilder('order')
        .where(
          new Brackets((qb) => {
            qb.where("order.isActive = '1'");
          }),
        )
        .where(
          new Brackets((qb) => {
            if (query?.search && query?.searchBy)
              qb.andWhere(`order.${query?.searchBy} like :search`, {
                search: `%${query?.search}%`,
              });
            if (query.startDate && query.endDate) {
              qb.andWhere(
                `CONVERT(DATE, order.createdDate, 103) BETWEEN CONVERT(DATE, '${query.startDate}', 103) AND CONVERT(DATE, '${query.endDate}', 103)`,
              );
            }
          }),
        )
        // .where(
        //   `CONVERT(DATE, order.createdDate, 103) BETWEEN CONVERT(DATE, GETDATE(), 103) AND CONVERT(DATE, GETDATE(), 103)`,
        // )
        // This Month
        .leftJoinAndSelect('order.items', 'orderItem', 'orderItem.isActive = 1')
        .leftJoinAndMapOne(
          'orderItem.product',
          ProductEntity,
          'product',
          'product.id = orderItem.productId',
        )
        .orderBy(
          `order.${sortBy ?? 'orderCode'}`,
          sort === 'DESC' ? 'DESC' : 'ASC',
        )
        .skip(page ? (page - 1) * perPage : null)
        .take(perPage ?? null)
        .getManyAndCount();

      orders?.forEach((or) => {
        or.items.forEach((it) => {
          delete it['deletedDate'];
          delete it['deletedBy'];
          delete it['createdBy'];
          delete it['createdDate'];
          delete it['updatedDate'];
          delete it['updatedBy'];
          delete it['isActive'];
          delete it['product']['deletedDate'];
          delete it['product']['deletedBy'];
          delete it['product']['createdBy'];
          delete it['product']['createdDate'];
          delete it['product']['updatedDate'];
          delete it['product']['updatedBy'];
        });
      });

      return { orders, total };
    } catch {}
  }

  async save(order: OrderEntity): Promise<OrderEntity> {
    try {
      return await this.Order.save(order);
    } catch (error) {
      if (error && error.message && error.status) {
        throw new HttpException(error.message, error.status);
      } else {
        throw new Error(error.message);
      }
    }
  }

  // if not have orderItem.product will return ---> productId
  async getOrderById(id: string): Promise<OrderEntity> {
    try {
      const orderItem = await this.Order.createQueryBuilder('order')
        .leftJoinAndSelect('order.items', 'orderItem', 'orderItem.isActive = 1')
        .leftJoinAndMapOne(
          'orderItem.product',
          ProductEntity,
          'product',
          'product.id = orderItem.productId',
        )
        .leftJoinAndMapOne(
          'product.group',
          GroupEntity,
          'group',
          'group.id = product.groupId',
        )
        .where(
          new Brackets((qb) => {
            qb.andWhere('order.id = :id', { id });
          }),
        )
        .getOne();

      orderItem?.items.forEach((it) => {
        delete it['deletedDate'];
        delete it['deletedBy'];
        delete it['createdBy'];
        delete it['createdDate'];
        delete it['updatedDate'];
        delete it['updatedBy'];
        delete it['isActive'];
        delete it['product']['deletedDate'];
        delete it['product']['deletedBy'];
        delete it['product']['createdBy'];
        delete it['product']['createdDate'];
        delete it['product']['updatedDate'];
        delete it['product']['updatedBy'];
        delete it['product']['group']['deletedDate'];
        delete it['product']['group']['deletedBy'];
        delete it['product']['group']['createdBy'];
        delete it['product']['group']['createdDate'];
        delete it['product']['group']['updatedDate'];
        delete it['product']['group']['updatedBy'];
      });

      return orderItem;
    } catch (error) {
      if (error && error.message && error.status) {
        throw new HttpException(error.message, error.status);
      } else {
        throw new Error(error.message);
      }
    }
  }

  async updateOrder(id, order: OrderEntity): Promise<OrderEntity> {
    try {
      const { discount, items } = order;

      const orderFind = await this.Order.findOneBy({
        id,
        isActive: true,
      });

      if (orderFind === null)
        throw new NotFoundException('ไม่พบประเภท Order ที่ต้องการแก้ไข');

      orderFind.discount = discount;
      orderFind.items = items;
      orderFind.updatedDate = new Date();

      const saveResult = await this.Order.save(orderFind);
      return saveResult;
    } catch (e) {
      throw e;
    }
  }
  async deleteOrder(id: string, user: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const orderDelete = await this.Order.findOneBy({
          id,
        });

        if (!orderDelete)
          throw new NotFoundException(`ไม่พบ 
          Order ที่ระบุ`);
        orderDelete.deletedBy = user;
        orderDelete.updatedBy = user;
        orderDelete.isActive = false;
        await this.Order.save(orderDelete);
        await this.Order.softRemove(orderDelete);

        // softRemove This feature does not delete records but instead updates the column decorated
        return resolve('ลบข้อมูลสำเร็จ');
      } catch (e) {
        return reject(e);
      }
    });
  }
}
