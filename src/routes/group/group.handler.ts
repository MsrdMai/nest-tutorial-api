import { GroupUsecase } from 'src/use-cases/groups/group.usecase';
import { GroupResponse } from 'src/core/dtos/respone/group-response.dto';
import {
  GroupRequest,
  CreateGroupReq,
} from 'src/core/dtos/request/group.request';
import { GroupEntity } from 'src/database/entities/group.entity';
import { BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class GroupHandler {
  constructor(private readonly gu: GroupUsecase) {}

  async getList(query: GroupRequest) {
    try {
      return await this.gu.findAll(query);
    } catch (e) {
      throw e;
    }
  }

  async getById(id: string) {
    try {
      return await this.gu.getGroupById(id);
    } catch (e) {
      throw e;
    }
  }

  async create(g: CreateGroupReq) {
    try {
      const { groupName, remark } = g;

      const ge = new GroupEntity();
      ge.groupName = groupName;
      ge.remark = remark;
      ge.createdBy = 'Mai';

      return await this.gu.save(ge);
    } catch (e) {
      throw e;
    }
  }

  async update(id: string, r: CreateGroupReq) {
    try {
      const p = await this.gu.getGroupById(id);
      if (!p || p === null)
        throw new BadRequestException('ไม่พบ project config ที่ระบุ');

      p.groupName = r.groupName;
      p.remark = r.remark;
      p.updatedBy = 'Mai';

      const resp = await this.gu.updateGroup(id, p);
      return {
        id: resp.id,
      };
    } catch (e) {
      throw e;
    }
  }

  async delete(id: string) {
    try {
      return await this.gu.deleteGroup(id, 'Mai');
    } catch (e) {
      throw e;
    }
  }
}
