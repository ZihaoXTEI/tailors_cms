import { AppDataSource } from '../../app/database'
import Supplier from '../../entity/Supplier'

class SupplierService {
  private repository = AppDataSource.getRepository(Supplier)
  private readonly tableName = 'supplier_tb'

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
      .skip(skip)
      .take(take)
      .getMany()
    const totalPromise = this.repository.count()

    const [list, total] = await Promise.all([listPromise, totalPromise])

    return { list, total }
  }
}

export default SupplierService
