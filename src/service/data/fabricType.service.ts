import { AppDataSource } from '../../app/database'
import FabricType from '../../entity/FabricType'

class FabricTypeService {
  private repository = AppDataSource.getRepository(FabricType)
  private readonly tableName = 'fabrictype_tb'

  async insertFabricType(bodyData: any) {
    const entity = this.repository.create(bodyData)
    const result = await this.repository.insert(entity)
    return result
  }

  async deleteFabricType(id: string) {
    const result = await this.repository.delete(id)
    return result
  }

  async updateFabricType(id: string, bodyData: any) {
    bodyData.id = id
    const entity = this.repository.create(bodyData)
    const result = await this.repository.save(entity)
    return result
  }

  async getFabricTypeById(id: string) {
    const result = await this.repository.findOneBy({ id })
    return result
  }

  async getFabricTypeList(skip = 0, take = 10, queryInfo: any = {}) {
    const { id = '', fabrictypeName = '' } = queryInfo
    const listPromise = this.repository
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.id LIKE :id`, { id: `%${id}%` })
      .andWhere(`${this.tableName}.fabrictype_name LIKE :fabrictypeName`, { fabrictypeName: `%${fabrictypeName}%` })
      .skip(skip)
      .take(take)
      .getMany()
    const totalPromise = this.repository.count()

    const [list, total] = await Promise.all([listPromise, totalPromise])

    return { list, total }
  }
}

export default FabricTypeService
