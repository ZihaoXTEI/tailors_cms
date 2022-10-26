import { AppDataSource } from '../../app/database'
import FabricInventory from '../../entity/FabricInventory'

class FabricInventoryService {
  private repository = AppDataSource.getRepository(FabricInventory)
  private readonly tableName = 'fabric_inventory_tb'

  async insertFabricInventory(bodyData: FabricInventory) {
    const entity = this.repository.create(bodyData)
    const result = await this.repository.insert(entity)
    return result
  }

  async deleteFabricInventory(id: string) {
    const result = await this.repository.delete(id)
    return result
  }

  async updateFabricInventory(id: string, bodyData: any) {
    bodyData.id = id
    const entity = this.repository.create(bodyData)
    const result = await this.repository.save(entity)
    return result
  }

  async getFabricInventoryById(id: string) {
    const result = await this.repository.findOneBy({ id })
    return result
  }

  async getFabricInventoryList(skip = 0, take = 10, queryInfo: any = {}) {
    const { id = '', fabricName = '', inventory = [] } = queryInfo
    const fabricInventoryListQuery = this.repository
      .createQueryBuilder(this.tableName)
      .leftJoinAndSelect(`${this.tableName}.fabric`, 'fabric_tb')
      .where(`${this.tableName}.id LIKE :id`, { id: `%${id}%` })
      .andWhere(`fabric_tb.fabric_name LIKE :fabricName`, { fabricName: `%${fabricName}%` })

    if (Array.isArray(inventory) && inventory.length === 2) {
      fabricInventoryListQuery.andWhere(`${this.tableName}.inventory BETWEEN :min AND :max`, {
        min: inventory[0],
        max: inventory[1]
      })
    }

    const fabricInventoryList = fabricInventoryListQuery.skip(skip).take(take).getMany()
    const totalPromise = fabricInventoryListQuery.getCount()

    const [list, total] = await Promise.all([fabricInventoryList, totalPromise])

    return { list, total }
  }
}

export default FabricInventoryService
