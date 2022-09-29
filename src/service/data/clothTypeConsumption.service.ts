import { AppDataSource } from '../../app/database'
import ClothTypeConsumption from '../../entity/ClothTypeConsumption'

class ClothTypeConsumptionService {
  private repository = AppDataSource.getRepository(ClothTypeConsumption)
  private readonly tableName = 'clothtype_consumption_tb'

  async insertClothTypeConsumption(bodyData: any) {
    const entity = this.repository.create(bodyData)
    const result = await this.repository.insert(entity)
    return result
  }

  async deleteClothTypeConsumption(id: string) {
    const result = await this.repository.delete(id)
    return result
  }

  async updateClothTypeConsumption(id: string, bodyData: any) {
    bodyData.id = id
    const entity = this.repository.create(bodyData)
    const result = await this.repository.save(entity)
    return result
  }

  async getClothTypeConsumptionById(id: string) {
    const result = await this.repository.findOneBy({ id })
    return result
  }

  async getClothTypeConsumptionList(skip = 0, take = 10, queryInfo: any = {}) {
    const { id = '', clothtypeName = '', fabricWidth = '' } = queryInfo
    const clothTypeConsumptionListQuery = this.repository
      .createQueryBuilder(this.tableName)
      .leftJoinAndSelect(`${this.tableName}.clothType`, 'clothtype_tb')
      .where(`${this.tableName}.id LIKE :id`, { id: `%${id}%` })
      .andWhere('clothtype_tb.clothtype_Name LIKE :clothtypeName', { clothtypeName: `%${clothtypeName}%` })

    if (fabricWidth !== '') {
      clothTypeConsumptionListQuery.andWhere(`${this.tableName}.fabric_width = :fabricWidth`, {
        fabricWidth: `${fabricWidth}`
      })
    }

    const clothTypeConsumptionList = clothTypeConsumptionListQuery.skip(skip).take(take).getMany()

    const clothTypeConsumptionTotal = clothTypeConsumptionListQuery.getCount()

    const [list, total] = await Promise.all([clothTypeConsumptionList, clothTypeConsumptionTotal])

    return { list, total }
  }
}

export default ClothTypeConsumptionService
