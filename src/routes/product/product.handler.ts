import { ProductUsecase } from 'src/use-cases/products/product.usecase';
import { ProductResponse } from 'src/core/dtos/respone/product-response.dto';
import {
  ProductRequest,
  CreateProductReq,
} from 'src/core/dtos/request/product.request';
import { ProductEntity } from 'src/database/entities/product.entity';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class ProductHandler {
  constructor(private readonly pd: ProductUsecase) {}

  async getList(query: ProductRequest) {
    try {
      return await this.pd.findAll(query);
    } catch (e) {
      throw e;
    }
  }

  async getById(id: string) {
    try {
      return await this.pd.getProductById(id);
    } catch (e) {
      throw e;
    }
  }

  async create(g: CreateProductReq) {
    try {
      const { productName, discrption, price, inStock, groupId } = g;

      const p = new ProductEntity();

      p.productName = productName;
      p.discrption = discrption;
      p.price = price;
      p.inStock = inStock;
      p.groupId = groupId;
      p.createdBy = 'Mai';

      return await this.pd.save(p);
    } catch (e) {
      throw e;
    }
  }

  async update(id: string, r: CreateProductReq) {
    try {
      const p = await this.pd.getProductById(id);
      if (!p || p === null)
        throw new BadRequestException('ไม่พบ Product ที่ระบุ');

      p.productName = r.productName;
      p.discrption = r.discrption;
      p.price = r.price;
      p.inStock = r.inStock;
      p.groupId = r.groupId;
      p.updatedBy = 'Mai';

      const resp = await this.pd.update(id, p);
      return {
        id: resp.id,
      };
    } catch (e) {
      throw e;
    }
  }

  async delete(id: string) {
    try {
      return await this.pd.delete(id, 'Mai');
    } catch (e) {
      throw e;
    }
  }
}
