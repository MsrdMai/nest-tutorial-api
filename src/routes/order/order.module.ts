import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderHandler } from './order.handler';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderHandler],
  exports: [OrderHandler],
})
export class OrderModule {}
