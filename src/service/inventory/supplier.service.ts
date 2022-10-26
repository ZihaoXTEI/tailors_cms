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

  async getList(skip = 0, take = 10, queryInfo: any = {}) {
    const { id = '', supplierName = '', supplierPhone = '', supplierAddress = '' } = queryInfo

    const supplierListQuery = this.repository
      .createQueryBuilder(this.tableName)
      .where(`${this.tableName}.id LIKE :id`, { id: `%${id}%` })
      .andWhere(`${this.tableName}.supplier_name LIKE :supplierName`, { supplierName: `%${supplierName}%` })
      .andWhere(`${this.tableName}.supplier_address LIKE :supplierAddress`, { supplierAddress: `%${supplierAddress}%` })

    if (supplierPhone !== '') {
      supplierListQuery.andWhere(`${this.tableName}.supplier_phone = :supplierPhone`, {
        supplierPhone: `${supplierPhone}`
      })
    }

    const supplierList = supplierListQuery.skip(skip).take(take).getMany()
    const totalPromise = supplierListQuery.getCount()

    const [list, total] = await Promise.all([supplierList, totalPromise])

    return { list, total }
  }

  async getSupplierOption() {
    const supplierOption = await this.repository
      .createQueryBuilder(this.tableName)
      .select(['supplier_tb.id AS value', 'supplier_tb.supplierName AS label'])
      .getRawMany()

    return supplierOption
  }
}

export default SupplierService
