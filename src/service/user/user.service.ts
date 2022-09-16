import User from '../../entity/User'
import { AppDataSource } from '../../app/database'
import Staff from '../../entity/Staff'
import Customer from '../../entity/Customer'

class UserService {
  private userRepository = AppDataSource.getRepository(User)
  private readonly tableName = 'user_tb'

  // 创建用户信息
  async createUser(user: User, role: Staff | Customer) {
    // const result = await this.userRepository.save(user)
    // return result
    const queryRunner = AppDataSource.createQueryRunner()
    await queryRunner.connect()

    // 开启事务
    await queryRunner.startTransaction()

    try {
      // 创建用户信息
      const userResult = await queryRunner.manager.save(user)

      // 创建员工信息
      role.userId = userResult.id
      const result = await queryRunner.manager.save(role)

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

  // 根据ID获取用户
  async getUserById(id: string) {
    // const result = await this.userRepository.findOne({
    //   where: { id }
    // })
    // return result

    const result = await this.userRepository
      .createQueryBuilder(this.tableName)
      .leftJoinAndSelect(`${this.tableName}.staff`, 'staff_tb')
      .leftJoinAndSelect(`${this.tableName}.customer`, 'customer_tb')
      .where(`${this.tableName}.id = :id`, { id })
      .getOne()

    return result
  }

  // 根据用户名获取用户
  async getUserByName(name: string) {
    const result = await this.userRepository.findOne({
      where: { nickname: name }
    })
    return result
  }

  // 创建员工信息
  async createStaff(user: User, staff: Staff) {
    return await this.createUser(user, staff)
  }

  // 创建顾客信息
  async createCustomer(user: User, customer: Customer) {
    return await this.createUser(user, customer)
  }
}

export default new UserService()
