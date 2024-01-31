import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { GroupHandler } from './group.handler';

@Module({
  controllers: [GroupController],
  providers: [GroupService, GroupHandler],
  exports: [GroupHandler],
})
export class GroupModule {}
