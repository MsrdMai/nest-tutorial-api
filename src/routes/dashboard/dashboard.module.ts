import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { DashboardHandler } from './dashboard.handler';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, DashboardHandler],
  exports: [DashboardHandler],
})
export class DashboardModule {}
