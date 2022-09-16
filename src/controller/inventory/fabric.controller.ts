import { Context } from 'koa'
import ErrorType from '../../constant/errorType'
import SuccessType from '../../constant/successType'
import FabricService from '../../service/inventory/fabric.service'
import ErrorObject from '../../utils/errorObject'
import SuccessObject from '../../utils/successObject'

class FabricController {
  private fabricService = new FabricService()
  private chineseName = '布料'

  createFabric = async (ctx: Context) => {
    const { body } = ctx.request
    console.log(body)

    try {
      await this.fabricService.insert(body)
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

  deleteFabric = async (ctx: Context) => {
    const { fabricId } = ctx.params
    console.log(fabricId)

    try {
      await this.fabricService.delete(fabricId)
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

  updateFabric = async (ctx: Context) => {
    const { fabricId } = ctx.params
    const { body } = ctx.request

    try {
      await this.fabricService.update(fabricId, body)
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

  getFabricById = async (ctx: Context) => {
    const { fabricId } = ctx.params

    try {
      const result = await this.fabricService.getById(fabricId)
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

  getFabricList = async (ctx: Context) => {
    const { skip, take } = ctx.request.body

    try {
      const result = await this.fabricService.getList(skip, take)
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

export default new FabricController()
