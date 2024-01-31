import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { GroupEntity } from 'src/database/entities/group.entity';
import { GroupRequest } from 'src/core/dtos/request/group.request';

export interface IGroupRepo {
  getGroupById(id: string): Promise<GroupEntity>;
  save(group: GroupEntity): Promise<GroupEntity>;
  findAll(
    query: GroupRequest,
    id: string,
  ): Promise<{ groups: GroupEntity[]; total: number }>;
}

@Injectable() // บอกว่าเป็น service
export class GroupEntityRepository implements IGroupRepo {
  constructor(
    @InjectRepository(GroupEntity)
    private readonly reGroup: Repository<GroupEntity>,
  ) {}

  async findAll(
    query: GroupRequest,
  ): Promise<{ groups: GroupEntity[]; total: number }> {
    try {
      const { search, searchBy, sort, sortBy, page, perPage } = query;

      const [groups, total] = await this.reGroup
        .createQueryBuilder('group')
        .where(
          new Brackets((qb) => {
            qb.where("group.isActive = '1'");
          }),
        )
        .orderBy(
          `group.${sortBy ?? 'groupName'}`,
          sort === 'DESC' ? 'DESC' : 'ASC',
        )
        .skip(page ? (page - 1) * perPage : null)
        .take(perPage ?? null)
        .getManyAndCount();

      return { groups, total };
    } catch {}
  }

  async save(group: GroupEntity): Promise<GroupEntity> {
    try {
      return await this.reGroup.save(group);
    } catch (error) {
      if (error && error.message && error.status) {
        throw new HttpException(error.message, error.status);
      } else {
        throw new Error(error.message);
      }
    }
  }

  async getGroupById(id: string): Promise<GroupEntity> {
    try {
      const group = await this.reGroup.findOneBy({
        id: id,
      });
      return group;
    } catch (error) {
      if (error && error.message && error.status) {
        throw new HttpException(error.message, error.status);
      } else {
        throw new Error(error.message);
      }
    }
  }

  async updateGroup(id, request: GroupEntity): Promise<GroupEntity> {
    try {
      const { groupName, remark } = request;

      const groupFind = await this.reGroup.findOneBy({
        id,
        isActive: true,
      });

      if (groupFind === null)
        throw new NotFoundException('ไม่พบประเภท Group ที่ต้องการแก้ไข');

      groupFind.groupName = groupName;
      groupFind.remark = remark;

      const saveResult = await this.reGroup.save(groupFind);
      return saveResult;
    } catch (e) {
      throw e;
    }
  }
  async deleteGroup(id: string, user: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const groupDelete = await this.reGroup.findOneBy({
          id,
        });

        if (!groupDelete)
          throw new NotFoundException(`ไม่พบ 
        Group ที่ระบุ`);
        groupDelete.deletedBy = user;
        groupDelete.updatedBy = user;
        groupDelete.isActive = false;
        await this.reGroup.save(groupDelete);
        await this.reGroup.softRemove(groupDelete);

        return resolve('ลบข้อมูลสำเร็จ');
      } catch (e) {
        return reject(e);
      }
    });
  }
}
