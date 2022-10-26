import { AppDataSource } from '../../app/database'
import Fabric from '../../entity/Fabric'
import FabricImage from '../../entity/FabricImage'
import FabricInventory from '../../entity/FabricInventory'

class FabricService {
  private fabricRepository = AppDataSource.getRepository(Fabric)
  // private fabricImageRepository = AppDataSource.getRepository(FabricImage)
  private readonly tableName = 'fabric_tb'

  async insertFabric(bodyData: Fabric) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()

    // 开启事务
    await queryRunner.startTransaction()

    try {
      const entity = queryRunner.manager.create(Fabric, bodyData)
      // const result = await queryRunner.manager.save(entity)
      const result = await queryRunner.manager.insert<Fabric>(Fabric, entity)

      console.log(result.identifiers[0].id)

      const { fabricImageList } = bodyData

      // 保存图片数据
      if (fabricImageList && Array.isArray(fabricImageList)) {
        for (let i = 0; i < fabricImageList.length; i++) {
          const fabricImage = queryRunner.manager.create(FabricImage, fabricImageList[i])
          // const fabricImage = new FabricImage()
          // fabricImage.imageName = fabricImageList[i].imageName
          // fabricImage.mimetype = fabricImageList[i].mimetype
          // fabricImage.size = fabricImageList[i].size
          // fabricImage.url = fabricImageList[i].url
          // fabricImage.fabric = result
          fabricImage.fabricId = result.identifiers[0].id

          await queryRunner.manager.insert<FabricImage>(FabricImage, fabricImage)
        }
      }

      // 创建库存数据
      const fabricInventory = new FabricInventory()
      fabricInventory.fabricId = result.identifiers[0].id
      await queryRunner.manager.insert<FabricInventory>(FabricInventory, fabricInventory)

      // 提交事务
      await queryRunner.commitTransaction()

      return result
    } catch (error) {
      // 出现错误，需要回滚所做的操作
      await queryRunner.rollbackTransaction()

      // 继续向上层抛出异常
      throw error
    } finally {
      // 释放 queryRunner
      await queryRunner.release()
    }
  }

  async deleteFabric(id: string) {
    const result = await this.fabricRepository.delete(id)
    return result
  }

  async updateFabric(id: string, bodyData: Fabric) {
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()

    // 开启事务
    await queryRunner.startTransaction()

    try {
      bodyData.id = id
      const entity = queryRunner.manager.create(Fabric, bodyData)
      const result = await queryRunner.manager.save(entity)

      // Error: Cannot query across one-to-many for property fabricImageList
      // const result = await queryRunner.manager.insert<Fabric>(Fabric, entity, { id })

      const { fabricImageList } = bodyData

      if (fabricImageList && Array.isArray(fabricImageList)) {
        for (let i = 0; i < fabricImageList.length; i++) {
          if (fabricImageList[i] && fabricImageList[i].id) continue
          const fabricImage = queryRunner.manager.create(FabricImage, fabricImageList[i])
          fabricImage.fabric = result
          fabricImage.fabricId = id

          await queryRunner.manager.insert<FabricImage>(FabricImage, fabricImage)
        }
      }

      // 提交事务
      await queryRunner.commitTransaction()

      return result
    } catch (error) {
      // 出现错误，需要回滚所做的操作
      await queryRunner.rollbackTransaction()

      // 继续向上层抛出异常
      throw error
    } finally {
      // 释放 queryRunner
      await queryRunner.release()
    }
  }

  async getFabricById(id: string) {
    // const result = await this.fabricRepository.findOneBy({ id })

    const result = await this.fabricRepository
      .createQueryBuilder(this.tableName)
      .leftJoinAndSelect(`${this.tableName}.fabricImageList`, 'fabric_image_tb')
      .where(`${this.tableName}.id = :id`, { id })
      .getOne()

    return result
  }

  async getFabricList(skip = 0, take = 10, queryInfo: any = {}) {
    const {
      id = '',
      fabricName = '',
      fabricWidth = '',
      fabricSeason = '',
      fabricGender = '',
      fabricCategory = ''
    } = queryInfo

    const fabricQuery = this.fabricRepository
      .createQueryBuilder(this.tableName)
      .leftJoinAndSelect(`${this.tableName}.fabricType`, 'fabrictype_tb')
      .leftJoinAndSelect(`${this.tableName}.fabricImageList`, 'fabric_image_tb')
      .where(`${this.tableName}.id LIKE :id`, { id: `%${id}%` })
      .andWhere(`${this.tableName}.fabric_name LIKE :fabricName`, { fabricName: `%${fabricName}%` })

    if (fabricWidth !== '') {
      fabricQuery.andWhere(`${this.tableName}.fabric_width = :fabricWidth`, {
        fabricWidth: `${fabricWidth}`
      })
    }

    if (fabricSeason !== '') {
      fabricQuery.andWhere(`${this.tableName}.fabric_season = :fabricSeason`, {
        fabricSeason: `${fabricSeason}`
      })
    }

    if (fabricGender !== '') {
      fabricQuery.andWhere(`${this.tableName}.fabric_gender = :fabricGender`, {
        fabricGender: `${fabricGender}`
      })
    }

    if (fabricCategory !== '') {
      fabricQuery.andWhere('fabrictype_tb.fabric_category = :fabricCategory', {
        fabricCategory: `${fabricCategory}`
      })
    }

    const fabricList = fabricQuery.skip(skip).take(take).getMany()
    const totalPromise = fabricQuery.getCount()

    const [list, total] = await Promise.all([fabricList, totalPromise])

    return { list, total }
  }

  async getFabricOption() {
    const fabricOption = await this.fabricRepository
      .createQueryBuilder(this.tableName)
      .select(['fabric_tb.id AS value', 'fabric_tb.fabricName AS label'])
      .getRawMany()

    return fabricOption
  }
}

export default FabricService
