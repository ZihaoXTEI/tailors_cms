import { EntityTarget, ObjectLiteral, Repository } from 'typeorm'
import { AppDataSource } from '../../app/database'

class DataService {
  private repository: Repository<ObjectLiteral>
  private tableName: string

  constructor(entityTarget: EntityTarget<ObjectLiteral>, tableName: string) {
    this.repository = AppDataSource.getRepository(entityTarget)
    this.tableName = tableName
  }

  async insert(bodyData: any) {
    // 创建对应实体类
    const entity = this.repository.create(bodyData)
    const result = await this.repository.insert(entity)
    return result
  }

  async delete(id: string) {
    const reuslt = await this.repository.delete(id)
    return reuslt
  }

  async update(id: string, bodyData: any) {
    bodyData.id = id
    // 创建对应实体类
    const entity = this.repository.create(bodyData)
    const result = await this.repository.save(entity)
    return result
  }

  async getById(id: string) {
    const result = await this.repository.findOneBy({ id })
    return result
  }

  async getList(skip = 0, take = 10) {
    // take 和 skip 相当于 limit 和 offset
    const listPromise = this.repository
      .createQueryBuilder(this.tableName)
      .skip(skip)
      .take(take)
      .getMany()
    const totalPromise = this.repository.count()

    const [list, total] = await Promise.all([listPromise, totalPromise])

    return { list, total }
  }
}

export default DataService
