import { Context } from 'koa'
import ErrorType from '../../constant/errorType'
import SuccessType from '../../constant/successType'
import { convertPermission } from '../../router/system/convertToTreeStructure'
import PermissionService from '../../service/system/permission.service'
import ErrorObject from '../../utils/errorObject'
import SuccessObject from '../../utils/successObject'

class PermissionController {
  private permissionService = new PermissionService()
  private chineseName = '权限'

  createPermission = async (ctx: Context) => {
    const { body } = ctx.request
    console.log(body)

    try {
      await this.permissionService.insert(body)
      const data = new SuccessObject(SuccessType.CREATED, `添加${this.chineseName}数据成功`)
      ctx.status = SuccessType.CREATED
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`添加${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  deletePermission = async (ctx: Context) => {
    const { permissionId } = ctx.params
    console.log(permissionId)

    try {
      await this.permissionService.delete(permissionId)
      const data = new SuccessObject(SuccessType.OK, `删除${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`删除${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  updatePermission = async (ctx: Context) => {
    const { permissionId } = ctx.params
    const { body } = ctx.request

    try {
      await this.permissionService.update(permissionId, body)
      const data = new SuccessObject(SuccessType.CREATED, `更新${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`更新${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getPermissionById = async (ctx: Context) => {
    const { permissionId } = ctx.params

    try {
      const result = await this.permissionService.getById(permissionId)
      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getPermissionList = async (ctx: Context) => {
    const { skip, take } = ctx.request.body

    try {
      const result = await this.permissionService.getList(skip, take)
      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getPermissionListByRoleId = async (ctx: Context) => {
    const roleId = 1
    try {
      const result = await this.permissionService.getListByRoleId(roleId)

      const permissionMap = convertPermission(result)

      const data = new SuccessObject(SuccessType.OK, `获取角色${this.chineseName}数据成功`, permissionMap)
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  initData = async (ctx: Context) => {
    try {
      await this.permissionService.initData()
      const data = new SuccessObject(SuccessType.OK, `初始化${this.chineseName}数据成功`)
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`初始化${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }
}

export default new PermissionController()
