import { AppDataSource } from '../../app/database'
import Staff from '../../entity/Staff'

class StaffService {
  private repository = AppDataSource.getRepository(Staff)
  private readonly tableName = 'staff_tb'

  async insertStaff(bodyData: any) {
    const entity = this.repository.create(bodyData)
    const result = await this.repository.insert(entity)
    return result
  }

  async deleteStaff(id: string) {
    const result = await this.repository.delete(id)
    return result
  }

  async updateStaff(id: string, bodyData: any) {
    bodyData.id = id
    const entity = this.repository.create(bodyData)
    const result = await this.repository.save(entity)
    return result
  }

  async getStaffById(id: string) {
    const result = await this.repository
      // .findOneBy({ userId: id })
      .findOne({
        where: {
          userId: id
        },
        relations: {
          user: true,
          fabricInboundList: false
        }
      })

    return result
  }

  async getStaffList(skip = 0, take = 10, queryInfo: any = {}) {
    console.log('queryInfo', queryInfo)
    const {
      userId = '',
      staffName = '',
      staffGender = '',
      staffSalary = '',
      staffPhone = '',
      staffAddress = ''
    } = queryInfo
    const staffListQuery = this.repository
      .createQueryBuilder(this.tableName)
      .leftJoinAndSelect(`${this.tableName}.user`, 'user_id')
      .where(`${this.tableName}.user_id LIKE :userId`, { userId: `%${userId}%` })
      .andWhere(`${this.tableName}.staff_name LIKE :staffName`, { staffName: `%${staffName}%` })
      .andWhere(`${this.tableName}.staff_phone LIKE :staffPhone`, { staffPhone: `%${staffPhone}%` })
      .andWhere(`${this.tableName}.staff_address LIKE :staffAddress`, { staffAddress: `%${staffAddress}%` })

    if (staffGender !== '') {
      staffListQuery.andWhere(`${this.tableName}.staff_gender = :staffGender`, {
        staffGender: `${staffGender}`
      })
    }

    if (staffSalary !== '') {
      staffListQuery.andWhere(`${this.tableName}.staff_salary >= :staffSalary`, {
        staffSalary: staffSalary
      })
    }

    const staffList = staffListQuery.skip(skip).take(take).getMany()

    const staffTotal = staffListQuery.getCount()

    const [list, total] = await Promise.all([staffList, staffTotal])

    return { list, total }
  }
}

export default StaffService
