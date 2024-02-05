import { Module } from '@nestjs/common';
import { GroupModule } from './group/group.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { DashboardModule } from './dashboard/dashboard.module';

@Module({
  imports: [GroupModule, ProductModule, OrderModule, DashboardModule],
  providers: [],
  exports: [],
})
export class RoutesModule {}
