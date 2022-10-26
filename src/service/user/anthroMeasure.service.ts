import { AppDataSource } from '../../app/database'
import AnthroMeasure from '../../entity/AnthroMeasure'

class AnthroMeasureService {
  private repository = AppDataSource.getRepository(AnthroMeasure)
  private readonly tableName = 'anthromeasure_tb'

  async insertAnthroMeasure(bodyData: AnthroMeasure) {
    const entity = this.repository.create(bodyData)
    const result = await this.repository.insert(entity)
    return result
  }

  async deleteAnthroMeasure(id: string) {
    const result = await this.repository.delete(id)
    return result
  }

  async updateAnthroMeasure(id: string, bodyData: AnthroMeasure) {
    bodyData.id = id
    const entity = this.repository.create(bodyData)
    const result = await this.repository.save(entity)
    return result
  }

  async getAnthroMeasureById(id: string) {
    const result = await this.repository.findOneBy({ id })
    return result
  }

  async getAnthroMeasureList(skip = 0, take = 10, queryInfo: any = {}) {
    console.log('queryInfo', queryInfo)
    const { id = '', customerId = '' } = queryInfo
    const anthroMeasureListQuery = this.repository
      .createQueryBuilder(this.tableName)
      .leftJoin(`${this.tableName}.customer`, 'customer_id')
      .where(`${this.tableName}.id LIKE :id`, { id: `%${id}%` })
      .andWhere(`${this.tableName}.customer_id LIKE :customerId`, {
        customerId: `%${customerId}%`
      })

    const anthroMeasureList = anthroMeasureListQuery.skip(skip).take(take).getMany()

    const anthroMeasureTotal = anthroMeasureListQuery.getCount()

    const [list, total] = await Promise.all([anthroMeasureList, anthroMeasureTotal])

    return { list, total }
  }
}

export default AnthroMeasureService
