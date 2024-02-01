import { Global, Module } from '@nestjs/common';
import { GroupEntityRepository } from './group.repository';
import { ProductRepository } from './product.repository';
import { OrderRepository } from './order.repository';

@Global()
@Module({
  imports: [],
  exports: [GroupEntityRepository, ProductRepository, OrderRepository],
  providers: [GroupEntityRepository, ProductRepository, OrderRepository],
})
export class RepositoriesModule {}
