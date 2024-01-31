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
import { GroupEntity } from 'src/database/entities/group.entity';
import {
  ProductRequest,
  CreateProductReq,
} from 'src/core/dtos/request/product.request';

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

  // leftJoinAndMapOne = output is object
  // leftJoinAndMapMany = output is array

  async findAll(
    query: ProductRequest,
  ): Promise<{ products: ProductEntity[]; total: number }> {
    try {
      const { search, searchBy, sort, sortBy, page, perPage } = query;

      const [products, total] = await this.Product.createQueryBuilder('product')
        .where(
          new Brackets((qb) => {
            qb.where("product.isActive = '1'");
          }),
        )
        .leftJoinAndMapOne(
          'product.group',
          GroupEntity,
          'group',
          'group.id = product.groupId',
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
      const productItem = await this.Product.findOneBy({
        id: id,
      });
      return productItem;
    } catch (error) {
      if (error && error.message && error.status) {
        throw new HttpException(error.message, error.status);
      } else {
        throw new Error(error.message);
      }
    }
  }

  async updateProduct(id, request: ProductEntity): Promise<ProductEntity> {
    try {
      const { productName, discrption, price, inStock, groupId } = request;

      const groupFind = await this.Product.findOneBy({
        id,
        isActive: true,
      });

      if (groupFind === null)
        throw new NotFoundException('ไม่พบประเภท Group ที่ต้องการแก้ไข');

      groupFind.productName = productName;
      groupFind.discrption = discrption;
      groupFind.price = price;
      groupFind.inStock = inStock;
      groupFind.groupId = groupId;

      const saveResult = await this.Product.save(groupFind);
      return saveResult;
    } catch (e) {
      throw e;
    }
  }
  async deleteProduct(id: string, user: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const productDelete = await this.Product.findOneBy({
          id,
        });

        if (!productDelete)
          throw new NotFoundException(`ไม่พบ 
          Product ที่ระบุ`);
        productDelete.deletedBy = user;
        productDelete.updatedBy = user;
        productDelete.isActive = false;
        await this.Product.save(productDelete);
        await this.Product.softRemove(productDelete);

        return resolve('ลบข้อมูลสำเร็จ');
      } catch (e) {
        return reject(e);
      }
    });
  }
}
