import { Global, Module } from '@nestjs/common';
import { GroupUsecase } from './groups/group.usecase';
import { ProductUsecase } from './products/product.usecase';

@Global()
@Module({
  imports: [],
  exports: [GroupUsecase, ProductUsecase],
  providers: [GroupUsecase, ProductUsecase],
})
export class UseCaseModule {}
