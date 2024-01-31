import { Module } from '@nestjs/common';
import { GroupModule } from './group/group.module';
import { ProductModule } from './product/product.module';

@Module({
  imports: [GroupModule, ProductModule],
  providers: [],
  exports: [],
})
export class RoutesModule {}
