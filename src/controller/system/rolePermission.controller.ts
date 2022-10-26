import { Context } from 'koa'
import ErrorType from '../../constant/errorType'
import SuccessType from '../../constant/successType'
import RolePermissionService from '../../service/system/rolePermission.service'
import ErrorObject from '../../utils/errorObject'
import SuccessObject from '../../utils/successObject'

class RolePermissionController {
  private rolePermissionService = new RolePermissionService()
  private chineseName = '角色权限'

  createRolePermission = async (ctx: Context) => {
    const { body } = ctx.request
    console.log(body)

    try {
      await this.rolePermissionService.insert(body)
      const data = new SuccessObject(SuccessType.CREATED, `添加${this.chineseName}数据成功`)
      ctx.status = SuccessType.CREATED
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`添加${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  deleteRolePermission = async (ctx: Context) => {
    const { userRoleId } = ctx.params

    try {
      await this.rolePermissionService.delete(userRoleId)
      const data = new SuccessObject(SuccessType.OK, `删除${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`删除${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  updateRolePermission = async (ctx: Context) => {
    const { userRoleId } = ctx.params
    const { body } = ctx.request

    try {
      await this.rolePermissionService.update(userRoleId, body)
      const data = new SuccessObject(SuccessType.CREATED, `更新${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`更新${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getRolePermissionById = async (ctx: Context) => {
    const { userRoleId } = ctx.params

    try {
      const result = await this.rolePermissionService.getById(userRoleId)
      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getRolePermissionList = async (ctx: Context) => {
    const { skip, take } = ctx.request.body

    try {
      const result = await this.rolePermissionService.getList(skip, take)
      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }
}

export default RolePermissionController
