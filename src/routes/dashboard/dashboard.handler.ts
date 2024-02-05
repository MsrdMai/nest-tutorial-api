import { OrderHandler } from '../order/order.handler';
import { BadRequestException, Injectable } from '@nestjs/common';
import { OrderRequest } from 'src/core/dtos/request/order.request';

@Injectable()
export class DashboardHandler {
  constructor(private readonly od: OrderHandler) {}

  async getDailyDashboard(r: OrderRequest) {
    try {
      const dailyRequestDto = new OrderRequest();
      const dailyRequest = await this.od.getList(r);

      let reportPrice = 0;
      let reportPriceIncludeDiscount = 0;

      dailyRequest.orders.map((order) => {
        reportPrice += order.priceTotal;
        reportPriceIncludeDiscount += order.discountInclude;
      });

      return {
        reportPrice: reportPrice,
        reportPriceIncludeDiscount: reportPriceIncludeDiscount,
      };
    } catch (e) {
      throw e;
    }
  }
}
