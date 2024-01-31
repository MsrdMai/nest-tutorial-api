import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductHandler } from './product.handler';

@Module({
  controllers: [ProductController],
  providers: [ProductService, ProductHandler],
  exports: [ProductHandler],
})
export class ProductModule {}
