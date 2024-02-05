import { Global, Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderHandler } from './order.handler';
@Global() /// <--- Make other module can call to use example is dashborad call order in handler function
@Module({
  controllers: [OrderController],
  providers: [OrderService, OrderHandler],
  exports: [OrderHandler],
})
export class OrderModule {}
