import { Context } from 'koa'
import ErrorType from '../../constant/errorType'
import SuccessType from '../../constant/successType'
import FabricTypeService from '../../service/data/fabricType.service'

import ErrorObject from '../../utils/errorObject'
import SuccessObject from '../../utils/successObject'

class FabricTypeController {
  private fabricTypeService = new FabricTypeService()
  private chineseName = '布料类型'

  createFabricType = async (ctx: Context) => {
    const { body } = ctx.request

    try {
      await this.fabricTypeService.insertFabricType(body)
      const data = new SuccessObject(SuccessType.CREATED, `添加${this.chineseName}数据成功`)
      ctx.status = SuccessType.CREATED
      ctx.body = data
    } catch (err) {
      console.log('[ERROR]', (err as any).code)
      const error = new ErrorObject(`添加${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  deleteFabricType = async (ctx: Context) => {
    const { fabricTypeId } = ctx.params

    try {
      await this.fabricTypeService.deleteFabricType(fabricTypeId)
      const data = new SuccessObject(SuccessType.OK, `删除${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`删除${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  updateFabricType = async (ctx: Context) => {
    const { fabricTypeId } = ctx.params
    const { body } = ctx.request

    try {
      await this.fabricTypeService.updateFabricType(fabricTypeId, body)
      const data = new SuccessObject(SuccessType.CREATED, `更新${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`更新${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getFabricTypeById = async (ctx: Context) => {
    const { fabricTypeId } = ctx.params

    try {
      const result = await this.fabricTypeService.getFabricTypeById(fabricTypeId)
      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getFabricTypeList = async (ctx: Context) => {
    const { skip, take } = ctx.request.body

    try {
      const result = await this.fabricTypeService.getFabricTypeList(skip, take, ctx.request.body)
      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }
}

export default FabricTypeController
