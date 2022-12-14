import { Context } from 'koa'
import ErrorType from '../../constant/errorType'
import SuccessType from '../../constant/successType'
import FabricInboundService from '../../service/inventory/fabricInbound.service'
import ErrorObject from '../../utils/errorObject'
import { objectArrayFlat } from '../../utils/objectUtil'
import SuccessObject from '../../utils/successObject'

class FabricInboundController {
  private fabricInboundService = new FabricInboundService()
  private chineseName = '布料入库'

  createFabricInbound = async (ctx: Context) => {
    const { body } = ctx.request
    console.log(body)

    try {
      await this.fabricInboundService.insertFabricInbound(body)
      const data = new SuccessObject(SuccessType.CREATED, `添加${this.chineseName}数据成功`)
      ctx.status = SuccessType.CREATED
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`添加${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  deleteFabricInbound = async (ctx: Context) => {
    const { fabricInboundId } = ctx.params
    console.log(fabricInboundId)

    try {
      await this.fabricInboundService.deleteFabricInbound(fabricInboundId)
      const data = new SuccessObject(SuccessType.OK, `删除${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`删除${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  updateFabricInbound = async (ctx: Context) => {
    const { fabricInboundId } = ctx.params
    const { body } = ctx.request

    try {
      await this.fabricInboundService.updateFabricInbound(fabricInboundId, body)
      const data = new SuccessObject(SuccessType.CREATED, `更新${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`更新${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getFabricInboundById = async (ctx: Context) => {
    const { fabricInboundId } = ctx.params

    console.log(fabricInboundId)

    try {
      const result = await this.fabricInboundService.getFabricInboundById(fabricInboundId)
      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getFabricInboundList = async (ctx: Context) => {
    const { skip, take } = ctx.request.body

    try {
      const result = await this.fabricInboundService.getFabricInboundList(skip, take, ctx.request.body)
      // const tempData = objectArrayFlat(result.list, 'supplier', ['supplierName'])
      const processedData = objectArrayFlat(result.list, ['supplier', 'staff'], ['supplierName', 'staffName'])
      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, {
        list: processedData,
        total: result.total
      })

      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }
}

export default new FabricInboundController()
