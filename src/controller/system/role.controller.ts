import { Context } from 'koa'
import ErrorType from '../../constant/errorType'
import SuccessType from '../../constant/successType'
import RoleService from '../../service/system/role.service'
import ErrorObject from '../../utils/errorObject'
import SuccessObject from '../../utils/successObject'

class RoleController {
  private roleService = new RoleService()
  private chineseName = '角色'

  createRole = async (ctx: Context) => {
    const { body } = ctx.request
    console.log(body)

    try {
      await this.roleService.insert(body)
      const data = new SuccessObject(SuccessType.CREATED, `添加${this.chineseName}数据成功`)
      ctx.status = SuccessType.CREATED
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`添加${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  deleteRole = async (ctx: Context) => {
    const { roleId } = ctx.params
    console.log(roleId)

    try {
      await this.roleService.delete(roleId)
      const data = new SuccessObject(SuccessType.OK, `删除${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`删除${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  updateRole = async (ctx: Context) => {
    const { roleId } = ctx.params
    const { body } = ctx.request

    try {
      await this.roleService.update(roleId, body)
      const data = new SuccessObject(SuccessType.CREATED, `更新${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`更新${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getRoleById = async (ctx: Context) => {
    const { roleId } = ctx.params

    try {
      const result = await this.roleService.getById(roleId)
      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getRoleList = async (ctx: Context) => {
    const { skip, take } = ctx.request.body

    try {
      const result = await this.roleService.getList(skip, take)
      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }
}

export default RoleController
