import { AppDataSource } from '../../app/database'
import Favorite from '../../entity/Favorite'

class CustomerFavoriteService {
  private repository = AppDataSource.getRepository(Favorite)
  private readonly tableName = 'favorite_tb'

  async insertCustomerFavorite(bodyData: Favorite) {
    const entity = this.repository.create(bodyData)
    const result = await this.repository.insert(entity)
    return result
  }

  async deleteCustomerFavorite(id: string) {
    const result = await this.repository.delete(id)
    return result
  }

  async updateCustomerFavorite(id: string, bodyData: Favorite) {
    bodyData.id = id
    const entity = this.repository.create(bodyData)
    const result = await this.repository.save(entity)
    return result
  }

  async getCustomerFavoriteById(id: string) {
    const result = await this.repository.findOneBy({ id })
    return result
  }

  async getCustomerFavoriteList(skip = 0, take = 10, queryInfo: any = {}) {
    console.log('queryInfo', queryInfo)
    const { id = '', customerId = '', fabricId = '' } = queryInfo
    const customerFavoriteListQuery = this.repository
      .createQueryBuilder(this.tableName)
      .leftJoin(`${this.tableName}.customer`, 'customer_id')
      .leftJoin(`${this.tableName}.fabric`, 'fabric_id')
      .where(`${this.tableName}.id LIKE :id`, { id: `%${id}%` })
      .andWhere(`${this.tableName}.customer_id LIKE :customerId`, {
        customerId: `%${customerId}%`
      })
      .andWhere(`${this.tableName}.fabric_id LIKE :fabricId`, {
        fabricId: `%${fabricId}%`
      })

    const customerFavoriteList = customerFavoriteListQuery.skip(skip).take(take).getMany()

    const customerFavoriteTotal = customerFavoriteListQuery.getCount()

    const [list, total] = await Promise.all([customerFavoriteList, customerFavoriteTotal])

    return { list, total }
  }
}

export default CustomerFavoriteService
