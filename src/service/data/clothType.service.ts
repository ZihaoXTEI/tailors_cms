import { AppDataSource } from '../../app/database'
import ClothType from '../../entity/ClothType'

class ClothTypeService {
  private clothTypeRepository = AppDataSource.getRepository(ClothType)

  async insertClothType(bodyData: any) {
    // 创建对应实体类
    const clothType = this.clothTypeRepository.create(bodyData)
    const result = await this.clothTypeRepository.insert(clothType)
    return result
  }

  async deleteClothType(clothTypeId: string) {
    const reuslt = await this.clothTypeRepository.delete(clothTypeId)
    return reuslt
  }

  async updateClothType(clothTypeId: string, bodyData: any) {
    bodyData.id = clothTypeId
    // 创建对应实体类
    const clothType = this.clothTypeRepository.create(bodyData)
    const result = await this.clothTypeRepository.save(clothType)
    return result
  }

  async getClothTypeById(clothTypeId: string) {
    const result = await this.clothTypeRepository.findOneBy({ id: clothTypeId })
    return result
  }

  async getClothTypeList(skip = 0, take = 10) {
    // take 和 skip 相当于 limit 和 offset
    const clothTypeList = await this.clothTypeRepository
      .createQueryBuilder('clothtype_tb')
      .skip(skip)
      .take(take)
      .getMany()

    const clothTypeTotal = await this.clothTypeRepository.count()

    return { list: clothTypeList, total: clothTypeTotal }
  }
}

export default new ClothTypeService()
