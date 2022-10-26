import { AppDataSource } from '../../app/database'
import UserRole from '../../entity/UserRole'

class UserRoleService {
  private repository = AppDataSource.getRepository(UserRole)
  private readonly tableName = 'user_role_tb'

  async insertUserRole(bodyData: UserRole) {
    const { userId, roleId, roleIdList } = bodyData
    const resultList = []

    if (roleId && typeof roleId === 'number') {
      resultList.push(await this.repository.insert({ userId, roleId: roleId }))
    } else if (Array.isArray(roleIdList)) {
      for (let i = 0; i < roleIdList.length; i++) {
        resultList.push(await this.repository.insert({ userId, roleId: roleIdList[i] }))
      }
    } else {
      return new Error()
    }

    return resultList
  }

  async deleteUserRole(id: string) {
    const result = await this.repository.delete(id)
    return result
  }

  async updateUserRole(id: string, bodyData: any) {
    bodyData.id = id
    const entity = this.repository.create(bodyData)
    const result = await this.repository.save(entity)
    return result
  }

  async getUserRoleById(id: string) {
    const result = await this.repository.findOneBy({ id })
    return result
  }

  async getUserRoleList(skip = 0, take = 10) {
    const listPromise = this.repository.createQueryBuilder(this.tableName).skip(skip).take(take).getMany()
    const totalPromise = this.repository.count()

    const [list, total] = await Promise.all([listPromise, totalPromise])

    return { list, total }
  }
}

export default UserRoleService
