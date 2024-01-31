import { Injectable } from '@nestjs/common';
import { GroupEntityRepository } from 'src/repositorise/group.repository';
import { GroupEntity } from 'src/database/entities/group.entity';
import { GroupRequest } from 'src/core/dtos/request/group.request';

@Injectable()
export class GroupUsecase {
  constructor(private readonly groupRepo: GroupEntityRepository) {}

  async getGroupById(id: string): Promise<GroupEntity> {
    try {
      return await this.groupRepo.getGroupById(id);
    } catch (e) {
      throw e;
    }
  }

  async findAll(
    query: GroupRequest,
  ): Promise<{ groups: GroupEntity[]; total: number }> {
    try {
      return await this.groupRepo.findAll(query);
    } catch (e) {
      throw e;
    }
  }

  async save(group: GroupEntity): Promise<GroupEntity> {
    try {
      return await this.groupRepo.save(group);
    } catch (e) {
      throw e;
    }
  }

  async updateGroup(id: string, groupReq: GroupEntity): Promise<GroupEntity> {
    try {
      const group = await this.groupRepo.updateGroup(id, groupReq);
      return group;
    } catch (e) {
      throw e;
    }
  }
  async deleteGroup(id: string, user: string): Promise<void> {
    try {
      await this.groupRepo.deleteGroup(id, user);
    } catch (e) {
      throw e;
    }
  }
}
