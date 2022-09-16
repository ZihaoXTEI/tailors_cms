import { Context } from 'koa'
import ErrorType from '../../constant/errorType'
import SuccessType from '../../constant/successType'
// import RoleService from '../../service/system/role.service'
import ErrorObject from '../../utils/errorObject'
import SuccessObject from '../../utils/successObject'

class SystemController {
  private service: any
  private chineseName: string

  constructor(service: Object, chineseName: string) {
    this.service = service
    this.chineseName = chineseName
  }

  create = async (ctx: Context) => {
    const { body } = ctx.request
    console.log(body)

    try {
      await this.service.insert(body)
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

  delete = async (ctx: Context) => {
    const { roleId } = ctx.params
    console.log(roleId)

    try {
      await this.service.delete(roleId)
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

  update = async (ctx: Context) => {
    const { roleId } = ctx.params
    const { body } = ctx.request

    try {
      await this.service.update(roleId, body)
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

  getDataById = async (ctx: Context) => {
    const { roleId } = ctx.params

    try {
      const result = await this.service.getById(roleId)
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

  getList = async (ctx: Context) => {
    const { skip, take } = ctx.request.body

    try {
      const result = await this.service.getList(skip, take)
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

export default SystemController
