import { AppDataSource } from '../../app/database'
import FabricInbound from '../../entity/FabricInbound'
import FabricInventory from '../../entity/FabricInventory'

class FabricInboundService {
  private fabricInboundRepository = AppDataSource.getRepository(FabricInbound)
  private readonly tableName = 'fabric_inbound_tb'

  async insertFabricInbound(bodyData: FabricInbound) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()

    // 开启事务
    await queryRunner.startTransaction()

    try {
      const fabricInbound = queryRunner.manager.create(FabricInbound, bodyData)

      const fabricInventory = await queryRunner.manager.findOneOrFail(FabricInventory, {
        where: {
          fabricId: fabricInbound.fabricId
        }
      })

      // 更新库存记录
      fabricInventory.inventory += fabricInbound.inboundLength

      // 更新布料库存数据
      await queryRunner.manager.update<FabricInventory>(FabricInventory, fabricInventory.id, fabricInventory)

      // 添加布料入库数据
      const result = await queryRunner.manager.insert<FabricInbound>(FabricInbound, fabricInbound)

      // 提交事务
      await queryRunner.commitTransaction()

      return result
    } catch (error) {
      console.log(error)
      // 出现错误，需要回滚所做的操作
      await queryRunner.rollbackTransaction()

      // 继续向上层抛出异常
      throw error
    } finally {
      // 释放 queryRunner
      await queryRunner.release()
    }
  }

  async deleteFabricInbound(id: string) {
    // 更新布料库存数据

    const result = await this.fabricInboundRepository.delete(id)
    return result
  }

  async updateFabricInbound(id: string, bodyData: FabricInbound) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()

    // 开启事务
    await queryRunner.startTransaction()

    try {
      const fabricInbound = queryRunner.manager.create(FabricInbound, bodyData)

      const fabricInventory = await queryRunner.manager.findOneOrFail(FabricInventory, {
        where: {
          fabricId: fabricInbound.fabricId
        }
      })

      const oldFabricInbound = await queryRunner.manager.findOneOrFail(FabricInbound, {
        where: {
          id
        }
      })

      // 更新库存记录
      fabricInventory.inventory -= oldFabricInbound.inboundLength
      fabricInventory.inventory += fabricInbound.inboundLength

      // 更新布料库存数据
      await queryRunner.manager.update<FabricInventory>(FabricInventory, fabricInventory.id, fabricInventory)

      // 更新布料入库数据
      const result = await queryRunner.manager.update<FabricInbound>(FabricInbound, id, fabricInbound)

      // 提交事务
      await queryRunner.commitTransaction()

      console.log(result)

      return result
    } catch (error) {
      console.log(error)
      // 出现错误，需要回滚所做的操作
      await queryRunner.rollbackTransaction()

      // 继续向上层抛出异常
      throw error
    } finally {
      // 释放 queryRunner
      await queryRunner.release()
    }
  }

  async getFabricInboundById(id: string) {
    const result = await this.fabricInboundRepository.findOneBy({ id })
    return result
  }

  async getFabricInboundList(skip = 0, take = 10, queryInfo: any = {}) {
    const {
      id = '',
      fabricId = '',
      inboundLength = [],
      inboundDate = [],
      supplierId = '',
      inboundReceiver = ''
    } = queryInfo

    const fabricInboundListQuery = this.fabricInboundRepository
      .createQueryBuilder(this.tableName)
      .innerJoinAndSelect(`${this.tableName}.fabric`, 'fabric_tb', 'fabric_tb.id LIKE :fabricId', {
        fabricId: `%${fabricId}%`
      })
      .innerJoinAndSelect(`${this.tableName}.supplier`, 'supplier_tb', 'supplier_tb.id LIKE :supplierId', {
        supplierId: `%${supplierId}%`
      })
      .innerJoinAndSelect(`${this.tableName}.staff`, 'staff_tb', 'staff_tb.user_id LIKE :inboundReceiver', {
        inboundReceiver: `%${inboundReceiver}%`
      })
      .where(`${this.tableName}.id LIKE :id`, { id: `%${id}%` })

    if (Array.isArray(inboundLength) && inboundLength.length === 2) {
      fabricInboundListQuery.andWhere(`${this.tableName}.inbound_length BETWEEN :min AND :max`, {
        min: inboundLength[0],
        max: inboundLength[1]
      })
    }

    if (Array.isArray(inboundDate) && inboundDate.length === 2) {
      fabricInboundListQuery.andWhere(`Date(${this.tableName}.inbound_date) BETWEEN :early AND :late`, {
        early: inboundDate[0],
        late: inboundDate[1]
      })
    }

    const fabricInboundList = fabricInboundListQuery.skip(skip).take(take).getMany()
    const totalPromise = fabricInboundListQuery.getCount()

    const [list, total] = await Promise.all([fabricInboundList, totalPromise])

    return { list, total }
  }
}

export default FabricInboundService
