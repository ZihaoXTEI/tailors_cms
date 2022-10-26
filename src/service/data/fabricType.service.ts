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
    const { id = '', fabrictypeName = '', fabricCategory = '' } = queryInfo
    const fabricTypeQuery = this.repository
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.id LIKE :id`, { id: `%${id}%` })
      .andWhere(`${this.tableName}.fabrictype_name LIKE :fabrictypeName`, { fabrictypeName: `%${fabrictypeName}%` })

    if (fabricCategory !== '') {
      fabricTypeQuery.andWhere('fabrictype_tb.fabric_category = :fabricCategory', {
        fabricCategory: `${fabricCategory}`
      })
    }

    const fabricTypeList = fabricTypeQuery.skip(skip).take(take).getMany()
    const totalPromise = fabricTypeQuery.getCount()

    const [list, total] = await Promise.all([fabricTypeList, totalPromise])

    return { list, total }
  }

  async getFabricTypeOption() {
    const fabricTypeOption = await this.repository
      .createQueryBuilder('fabrictype_tb')
      .select(['fabrictype_tb.id AS value', 'fabrictype_tb.fabrictypeName AS label'])
      .getRawMany()

    return fabricTypeOption
  }
}

export default FabricTypeService
