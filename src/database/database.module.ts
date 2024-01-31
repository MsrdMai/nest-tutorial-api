import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDatabaseName } from 'src/constants/database-name.constant';
import { GroupEntity } from './entities/group.entity';
import { ProductEntity } from './entities/product.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([GroupEntity, ProductEntity])],
  exports: [TypeOrmModule],
  providers: [],
})
export class DatabaseModule {}
