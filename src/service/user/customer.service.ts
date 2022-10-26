import { AppDataSource } from '../../app/database'
import Customer from '../../entity/Customer'

class CustomerService {
  private repository = AppDataSource.getRepository(Customer)
  private readonly tableName = 'customer_tb'

  async insertCustomer(bodyData: any) {
    const entity = this.repository.create(bodyData)
    const result = await this.repository.insert(entity)
    return result
  }

  async deleteCustomer(id: string) {
    const result = await this.repository.delete(id)
    return result
  }

  async updateCustomer(id: string, bodyData: any) {
    bodyData.id = id
    const entity = this.repository.create(bodyData)
    const result = await this.repository.save(entity)
    return result
  }

  async getCustomerById(id: string) {
    const result = await this.repository.findOne({
      where: {
        userId: id
      },
      relations: {
        user: true
      }
    })
    return result
  }

  async getCustomerList(skip = 0, take = 10, queryInfo: any = {}) {
    console.log('queryInfo', queryInfo)
    const { userId = '', customerName = '', customerGender = '', customerPhone = '', customerAddress = '' } = queryInfo
    const customerListQuery = this.repository
      .createQueryBuilder(this.tableName)
      .leftJoinAndSelect(`${this.tableName}.user`, 'user_id')
      .where(`${this.tableName}.user_id LIKE :userId`, { userId: `%${userId}%` })
      .andWhere(`${this.tableName}.customer_name LIKE :customerName`, { customerName: `%${customerName}%` })

    if (customerAddress !== '') {
      customerListQuery.andWhere(`${this.tableName}.customer_address LIKE :customerAddress`, {
        customerAddress: `%${customerAddress}%`
      })
    }

    if (customerPhone !== '') {
      customerListQuery.andWhere(`${this.tableName}.customer_phone LIKE :customerPhone`, {
        customerPhone: `%${customerPhone}%`
      })
    }

    if (customerGender !== '') {
      customerListQuery.andWhere(`${this.tableName}.customer_gender = :customerGender`, {
        customerGender: `${customerGender}`
      })
    }

    const customerList = customerListQuery.skip(skip).take(take).getMany()

    const customerTotal = customerListQuery.getCount()

    const [list, total] = await Promise.all([customerList, customerTotal])

    console.log(list)
    return { list, total }
  }

  async getCustomerOption() {
    const customerOption = await this.repository
      .createQueryBuilder(this.tableName)
      .select(['customer_tb.userId AS value', 'customer_tb.customerName AS label'])
      .getRawMany()

    return customerOption
  }
}

export default CustomerService
