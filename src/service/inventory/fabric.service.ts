import { AppDataSource } from '../../app/database'
import Fabric from '../../entity/Fabric'

class FabricService {
  private repository = AppDataSource.getRepository(Fabric)
  private readonly tableName = 'fabric_tb'

  async insert(bodyData: any) {
    const entity = this.repository.create(bodyData)

    const result = await this.repository.insert(entity)
    return result
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
    const listPromise = this.repository
      .createQueryBuilder(this.tableName)
      .leftJoinAndSelect(`${this.tableName}.fabricType`, 'fabrictype_tb')
      .skip(skip)
      .take(take)
      .getMany()
    const totalPromise = this.repository.count()

    const [list, total] = await Promise.all([listPromise, totalPromise])

    return { list, total }
  }
}

export default FabricService
