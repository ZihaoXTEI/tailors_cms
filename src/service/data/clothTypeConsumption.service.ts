import { AppDataSource } from '../../app/database'
import ClothTypeConsumption from '../../entity/ClothTypeConsumption'

class ClothTypeConsumptionService {
  private repository = AppDataSource.getRepository(ClothTypeConsumption)
  private readonly tableName = 'clothtype_consumption_tb'

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
      .leftJoinAndSelect(`${this.tableName}.clothType`, 'clothtype_tb')
      .skip(skip)
      .take(take)
      .getMany()
    const totalPromise = this.repository.count()

    const [list, total] = await Promise.all([listPromise, totalPromise])

    return { list, total }
  }
}

export default ClothTypeConsumptionService
