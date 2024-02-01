import { Module } from '@nestjs/common';
import { GroupModule } from './group/group.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [GroupModule, ProductModule, OrderModule],
  providers: [],
  exports: [],
})
export class RoutesModule {}
