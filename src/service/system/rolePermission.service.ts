import { AppDataSource } from '../../app/database'
import RolePermission from '../../entity/RolePermission'

class RolePermissionService {
  private repository = AppDataSource.getRepository(RolePermission)
  private readonly tableName = 'role_permission_tb'

  async insert(bodyData: RolePermission) {
    const { roleId, permissionId, permissionIdList } = bodyData
    const resultList = []

    if (permissionId && typeof permissionId === 'number') {
      resultList.push(await this.repository.insert({ roleId, permissionId: permissionId }))
    } else if (Array.isArray(permissionIdList)) {
      for (let i = 0; i < permissionIdList.length; i++) {
        resultList.push(await this.repository.insert({ roleId, permissionId: permissionIdList[i] }))
      }
    } else {
      return new Error()
    }

    return resultList
  }

  async delete(id: string) {
    const result = await this.repository.delete(id)
    return result
  }

  async update(id: string, bodyData: any) {
    bodyData.id = id
    const entity = this.repository.create(bodyData)
    const result = await this.repository.save(entity)
    return result
  }

  async getById(id: string) {
    const result = await this.repository.findOneBy({ id })
    return result
  }

  async getList(skip = 0, take = 10) {
    const listPromise = this.repository.createQueryBuilder(this.tableName).skip(skip).take(take).getMany()
    const totalPromise = this.repository.count()

    const [list, total] = await Promise.all([listPromise, totalPromise])

    return { list, total }
  }
}

export default RolePermissionService
