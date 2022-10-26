import { AppDataSource } from '../../app/database'
import Menu from '../../entity/Menu'

class MenuService {
  private repository = AppDataSource.getRepository(Menu)
  private readonly tableName = 'menu_tb'

  async insert(bodyData: any) {
    const entity = this.repository.create(bodyData)

    const result = await this.repository.insert(entity)
    return result
  }

  async delete(id: number) {
    const result = await this.repository.delete(id)
    return result
  }

  async update(id: number, bodyData: any) {
    bodyData.id = id
    const entity = this.repository.create(bodyData)
    const result = await this.repository.save(entity)
    return result
  }

  async getById(id: number) {
    const result = await this.repository.findOneBy({ id })
    return result
  }

  async getList() {
    // const listPromise = this.repository.createQueryBuilder(this.tableName).getMany()
    const listPromise = AppDataSource.getTreeRepository(Menu).findTrees()

    // const totalPromise = this.repository.count()
    const totalPromise = AppDataSource.getTreeRepository(Menu).count()

    const [list, total] = await Promise.all([listPromise, totalPromise])

    return { list, total }
  }

  async getMenuOption() {
    const menuOption = await this.repository
      .createQueryBuilder(this.tableName)
      .select(['menu_tb.id AS value', 'menu_tb.menuName AS label', 'url'])
      .getRawMany()

    return menuOption
  }
}

export default MenuService
