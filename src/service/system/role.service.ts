import { AppDataSource } from '../../app/database'
import Role from '../../entity/Role'

class RoleService {
  private repository = AppDataSource.getRepository(Role)
  private readonly tableName = 'role_tb'

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
    const listPromise = this.repository.createQueryBuilder(this.tableName).skip(skip).take(take).getMany()
    const totalPromise = this.repository.count()

    const [list, total] = await Promise.all([listPromise, totalPromise])

    return { list, total }
  }

  async getRoleOption() {
    const roleOption = await this.repository
      .createQueryBuilder(this.tableName)
      .select(['role_tb.id AS value', 'role_tb.roleName AS label'])
      .getRawMany()

    return roleOption
  }
}

export default RoleService
