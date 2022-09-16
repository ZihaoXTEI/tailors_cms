import { Context } from 'koa'
import ErrorType from '../../constant/errorType'
import SuccessType from '../../constant/successType'
import FabricType from '../../entity/FabricType'
import DataService from '../../service/data/data.service'
import ErrorObject from '../../utils/errorObject'
import SuccessObject from '../../utils/successObject'

class FabricTypeController {
  private fabricTypeService
  private chineseName = '布料类型'

  constructor() {
    this.fabricTypeService = new DataService(FabricType, 'fabricType_tb')
  }

  createClothType = async (ctx: Context) => {
    const { body } = ctx.request

    try {
      await this.fabricTypeService.insert(body)
      const data = new SuccessObject(SuccessType.CREATED, `添加${this.chineseName}数据成功`)
      ctx.status = SuccessType.CREATED
      ctx.body = data
    } catch (err) {
      console.log('[ERROR]', (err as any).code)
      const error = new ErrorObject(
        `添加${this.chineseName}数据错误`,
        ErrorType.INTERNAL_SERVER_ERROR
      )
      return ctx.app.emit('error', error, ctx)
    }
  }

  deleteClothType = async (ctx: Context) => {
    const { fabricTypeId } = ctx.params

    try {
      await this.fabricTypeService.delete(fabricTypeId)
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

  updateClothType = async (ctx: Context) => {
    const { fabricTypeId } = ctx.params
    const { body } = ctx.request

    try {
      await this.fabricTypeService.update(fabricTypeId, body)
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

  getClothTypeById = async (ctx: Context) => {
    const { fabricTypeId } = ctx.params

    try {
      const result = await this.fabricTypeService.getById(fabricTypeId)
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

  getClothTypeList = async (ctx: Context) => {
    const { skip, take } = ctx.request.body

    try {
      const result = await this.fabricTypeService.getList(skip, take)
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

export default FabricTypeController
