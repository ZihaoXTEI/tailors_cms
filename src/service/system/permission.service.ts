import { AppDataSource } from '../../app/database'
import Permission from '../../entity/Permission'
import RolePermission from '../../entity/RolePermission'

import { v4 as uuidv4 } from 'uuid'

class PermissionService {
  private repository = AppDataSource.getRepository(Permission)
  private readonly tableName = 'permission_tb'

  async insert(bodyData: any) {
    const entity = this.repository.create(bodyData)

    const result = await this.repository.insert(entity)
    return result
  }

  async delete(id: number) {
    const result = await this.repository.delete(id)
    return result
  }

  async update(id: number, bodyData: any) {
    bodyData.id = id
    const entity = this.repository.create(bodyData)
    const result = await this.repository.save(entity)
    return result
  }

  async getById(id: number) {
    const result = await this.repository.findOneBy({ id })
    return result
  }

  async getList(skip = 0, take = 10) {
    const listPromise = this.repository
      .createQueryBuilder(this.tableName)
      .skip(skip)
      .take(take)
      .getMany()
    const totalPromise = this.repository.count()

    const [list, total] = await Promise.all([listPromise, totalPromise])

    return { list, total }
  }

  async getListByRoleId(roleId: number) {
    // const list = await this.repository
    //   .createQueryBuilder(this.tableName)
    //   .where((qb) => {
    //     const subQuery = qb
    //       .subQuery()
    //       .select('role_permission_tb.permission_id')
    //       .from('role_permission_tb', 'role_permission_tb')
    //       .where('role_permission_tb.role_id = :roleId')
    //       .getQuery()

    //     return `${this.tableName}.id IN ${subQuery}`
    //   })
    //   .setParameter('roleId', roleId)
    //   .getMany()
    const list = await this.repository
      .createQueryBuilder(this.tableName)
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('role_permission_tb.permission_id')
          .from(RolePermission, 'role_permission_tb')
          .where('role_permission_tb.role_id = :roleId')
          .getQuery()

        return `${this.tableName}.id IN ${subQuery}`
      })
      .setParameter('roleId', roleId)
      .getMany()

    return list
  }

  async initData() {
    let result = null
    for (let i = 1; i <= 23; i++) {
      result = await this.repository
        .createQueryBuilder()
        .insert()
        .into(RolePermission)
        .values([{ permissionId: i, roleId: 1, id: uuidv4() }])
        .execute()
    }

    return result
  }
}

export default PermissionService
