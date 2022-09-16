import { AppDataSource } from '../../app/database'
import FabricInbound from '../../entity/FabricInbound'

class FabricInboundService {
  private repository = AppDataSource.getRepository(FabricInbound)
  private readonly tableName = 'fabric_inbound_tb'

  async insert(bodyData: any) {
    const entity = this.repository.create(bodyData)
    // 添加布料库存数据

    const result = await this.repository.insert(entity)
    return result
  }

  async delete(id: string) {
    // 更新布料库存数据

    const result = await this.repository.delete(id)
    return result
  }

  async update(id: string, bodyData: any) {
    // 更新布料库存数据

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
      .leftJoinAndSelect(`${this.tableName}.fabric`, 'fabric_tb')
      .skip(skip)
      .take(take)
      .getMany()
    const totalPromise = this.repository.count()

    const [list, total] = await Promise.all([listPromise, totalPromise])

    return { list, total }
  }
}

export default FabricInboundService
