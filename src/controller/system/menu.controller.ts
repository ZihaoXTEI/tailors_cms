import { Context } from 'koa'
import ErrorType from '../../constant/errorType'
import SuccessType from '../../constant/successType'
import MenuService from '../../service/system/menu.service'
import ErrorObject from '../../utils/errorObject'
import SuccessObject from '../../utils/successObject'

class MenuController {
  private menuService = new MenuService()
  private chineseName = '菜单'

  createMenu = async (ctx: Context) => {
    const { body } = ctx.request
    console.log(body)

    try {
      await this.menuService.insert(body)
      const data = new SuccessObject(SuccessType.CREATED, `添加${this.chineseName}数据成功`)
      ctx.status = SuccessType.CREATED
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(
        `添加${this.chineseName}数据错误`,
        ErrorType.INTERNAL_SERVER_ERROR
      )
      return ctx.app.emit('error', error, ctx)
    }
  }

  deleteMenu = async (ctx: Context) => {
    const { menuId } = ctx.params
    console.log(menuId)

    try {
      await this.menuService.delete(menuId)
      const data = new SuccessObject(SuccessType.OK, `删除${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(
        `删除${this.chineseName}数据错误`,
        ErrorType.INTERNAL_SERVER_ERROR
      )
      return ctx.app.emit('error', error, ctx)
    }
  }

  updateMenu = async (ctx: Context) => {
    const { menuId } = ctx.params
    const { body } = ctx.request

    try {
      await this.menuService.update(menuId, body)
      const data = new SuccessObject(SuccessType.CREATED, `更新${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(
        `更新${this.chineseName}数据错误`,
        ErrorType.INTERNAL_SERVER_ERROR
      )
      return ctx.app.emit('error', error, ctx)
    }
  }

  getMenuById = async (ctx: Context) => {
    const { menuId } = ctx.params

    try {
      const result = await this.menuService.getById(menuId)
      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
      ctx.body = data
    } catch {
      const error = new ErrorObject(
        `获取${this.chineseName}数据错误`,
        ErrorType.INTERNAL_SERVER_ERROR
      )
      return ctx.app.emit('error', error, ctx)
    }
  }

  getMenuList = async (ctx: Context) => {
    try {
      const result = await this.menuService.getList()
      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(
        `获取${this.chineseName}数据错误`,
        ErrorType.INTERNAL_SERVER_ERROR
      )
      return ctx.app.emit('error', error, ctx)
    }
  }
}

export default new MenuController()
