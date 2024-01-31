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
import { ProductRequest } from 'src/core/dtos/request/product.request';

export interface IProductRepo {
  getProductById(id: string): Promise<ProductEntity>;
  save(group: ProductEntity): Promise<ProductEntity>;
  findAll(
    query: ProductRequest,
    id: string,
  ): Promise<{ products: ProductEntity[]; total: number }>;
}

@Injectable()
export class ProductRepository implements IProductRepo {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly Product: Repository<ProductEntity>,
  ) {}

  async findAll(
    query: ProductRequest,
    id: string,
  ): Promise<{ products: ProductEntity[]; total: number }> {
    try {
      const { search, searchBy, sort, sortBy, page, perPage } = query;

      const [products, total] = await this.Product.createQueryBuilder('product')
        .where(
          new Brackets((qb) => {
            qb.where("product.isActive = '1'");
          }),
        )
        .orderBy(
          `product.${sortBy ?? 'productName'}`,
          sort === 'DESC' ? 'DESC' : 'ASC',
        )
        .skip(page ? (page - 1) * perPage : null)
        .take(perPage ?? null)
        .getManyAndCount();

      return { products, total };
    } catch {}
  }

  async save(group: ProductEntity): Promise<ProductEntity> {
    try {
      return await this.Product.save(group);
    } catch (error) {
      if (error && error.message && error.status) {
        throw new HttpException(error.message, error.status);
      } else {
        throw new Error(error.message);
      }
    }
  }

  async getProductById(id: string): Promise<ProductEntity> {
    try {
      const group = await this.Product.findOneBy({
        id: id,
      });
      return group;
    } catch (error) {
      if (error && error.message && error.status) {
        throw new HttpException(error.message, error.status);
      } else {
        throw new Error(error.message);
      }
    }
  }
}
