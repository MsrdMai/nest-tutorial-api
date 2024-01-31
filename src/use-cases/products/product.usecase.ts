import { Injectable } from '@nestjs/common';
import { ProductRepository } from 'src/repositorise/product.repository';
import { ProductEntity } from 'src/database/entities/product.entity';
import { ProductRequest } from 'src/core/dtos/request/product.request';

@Injectable()
export class ProductUsecase {
  constructor(private productRepo: ProductRepository) {}

  async getProductById(id: string): Promise<ProductEntity> {
    try {
      return await this.productRepo.getProductById(id);
    } catch (e) {
      throw e;
    }
  }

  async findAll(
    query: ProductRequest,
  ): Promise<{ products: ProductEntity[]; total: number }> {
    try {
      return await this.productRepo.findAll(query);
    } catch (e) {
      throw e;
    }
  }

  async save(product: ProductEntity): Promise<ProductEntity> {
    try {
      return await this.productRepo.save(product);
    } catch (e) {
      throw e;
    }
  }

  async update(id: string, prodReq: ProductEntity): Promise<ProductEntity> {
    try {
      const prod = await this.productRepo.updateProduct(id, prodReq);
      return prod;
    } catch (e) {
      throw e;
    }
  }
  async delete(id: string, user: string): Promise<void> {
    try {
      await this.productRepo.deleteProduct(id, user);
    } catch (e) {
      throw e;
    }
  }
}
