import { Global, Module } from '@nestjs/common';
import { GroupUsecase } from './groups/group.usecase';
import { ProductUsecase } from './products/product.usecase';
import { OrderUsecase } from './orders/order.usecase';

@Global()
@Module({
  imports: [],
  exports: [GroupUsecase, ProductUsecase, OrderUsecase],
  providers: [GroupUsecase, ProductUsecase, OrderUsecase],
})
export class UseCaseModule {}
