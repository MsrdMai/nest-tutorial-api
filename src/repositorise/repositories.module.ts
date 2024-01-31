import { Global, Module } from '@nestjs/common';
import { GroupEntityRepository } from './group.repository';
import { ProductRepository } from './product.repository';

@Global()
@Module({
  imports: [],
  exports: [GroupEntityRepository, ProductRepository],
  providers: [GroupEntityRepository, ProductRepository],
})
export class RepositoriesModule {}
