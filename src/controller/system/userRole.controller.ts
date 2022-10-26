import { Context } from 'koa'
import ErrorType from '../../constant/errorType'
import SuccessType from '../../constant/successType'
import UserRoleService from '../../service/system/userRole.service'
import ErrorObject from '../../utils/errorObject'
import SuccessObject from '../../utils/successObject'

class UserRoleController {
  private roleService = new UserRoleService()
  private chineseName = '用户角色'

  createUserRole = async (ctx: Context) => {
    const { body } = ctx.request
    console.log(body)

    try {
      await this.roleService.insertUserRole(body)
      const data = new SuccessObject(SuccessType.CREATED, `添加${this.chineseName}数据成功`)
      ctx.status = SuccessType.CREATED
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`添加${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  deleteUserRole = async (ctx: Context) => {
    const { userRoleId } = ctx.params

    try {
      await this.roleService.deleteUserRole(userRoleId)
      const data = new SuccessObject(SuccessType.OK, `删除${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`删除${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  updateUserRole = async (ctx: Context) => {
    const { userRoleId } = ctx.params
    const { body } = ctx.request

    try {
      await this.roleService.updateUserRole(userRoleId, body)
      const data = new SuccessObject(SuccessType.CREATED, `更新${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`更新${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getUserRoleById = async (ctx: Context) => {
    const { userRoleId } = ctx.params

    try {
      const result = await this.roleService.getUserRoleById(userRoleId)
      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getUserRoleList = async (ctx: Context) => {
    const { skip, take } = ctx.request.body

    try {
      const result = await this.roleService.getUserRoleList(skip, take)
      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }
}

export default UserRoleController
