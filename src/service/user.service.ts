import User from '../entity/User'
import { AppDataSource } from '../app/database'

class UserService {
  private userRepository = AppDataSource.getRepository(User)

  // 创建用户
  async createUser(user: User) {
    const result = await this.userRepository.save(user)
    return result
  }

  // 根据用户名获取用户
  async getUserByName(name: string) {
    const result = await this.userRepository.findOne({
      where: { nickname: name }
    })
    return result
  }
}

export default new UserService()
