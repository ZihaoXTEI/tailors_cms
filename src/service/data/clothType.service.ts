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

  async getClothTypeList(skip = 0, take = 10, queryInfo: any = {}) {
    const { id = '', clothtypeName = '', clothtypeSeason = '', clothtypeGender = '' } = queryInfo

    console.log(id, clothtypeName, clothtypeSeason, clothtypeGender)
    // take 和 skip 相当于 limit 和 offset
    const clothTypeQuery = this.clothTypeRepository
      .createQueryBuilder('clothtype_tb')
      .where('clothtype_tb.id LIKE :id', { id: `%${id}%` })
      .andWhere('clothtype_tb.clothtype_name LIKE :clothtypeName', { clothtypeName: `%${clothtypeName}%` })

    if (clothtypeSeason !== '') {
      clothTypeQuery.andWhere('clothtype_tb.clothtype_season = :clothtypeSeason', {
        clothtypeSeason: `${clothtypeSeason}`
      })
    }

    if (clothtypeGender !== '') {
      clothTypeQuery.andWhere('clothtype_tb.clothtype_gender = :clothtypeGender', { clothtypeGender })
    }

    const clothTypeList = clothTypeQuery.skip(skip).take(take).getMany()

    // const clothTypeTotal = this.clothTypeRepository.count()
    const clothTypeTotal = clothTypeQuery.getCount()

    const [list, total] = await Promise.all([clothTypeList, clothTypeTotal])

    return { list, total }
  }

  async getClothTypeOption() {
    const clothTypeOption = await this.clothTypeRepository
      .createQueryBuilder('clothtype_tb')
      .select(['clothtype_tb.id AS value', 'clothtype_tb.clothtypeName AS label'])
      .getRawMany()

    return clothTypeOption
  }
}

export default ClothTypeService
