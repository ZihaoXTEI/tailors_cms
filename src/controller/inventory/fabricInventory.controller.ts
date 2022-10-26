import { Context } from 'koa'
import ErrorType from '../../constant/errorType'
import SuccessType from '../../constant/successType'
import FabricInventoryService from '../../service/inventory/fabricInventory.service'

import ErrorObject from '../../utils/errorObject'
import SuccessObject from '../../utils/successObject'

class FabricInventoryController {
  private fabricInventoryService = new FabricInventoryService()
  private chineseName = '布料库存'

  createFabricInventory = async (ctx: Context) => {
    const { body } = ctx.request

    try {
      await this.fabricInventoryService.insertFabricInventory(body)
      const data = new SuccessObject(SuccessType.CREATED, `添加${this.chineseName}数据成功`)
      ctx.status = SuccessType.CREATED
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`添加${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  deleteFabricInventory = async (ctx: Context) => {
    const { fabricInventoryId } = ctx.params

    try {
      await this.fabricInventoryService.deleteFabricInventory(fabricInventoryId)
      const data = new SuccessObject(SuccessType.OK, `删除${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`删除${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  updateFabricInventory = async (ctx: Context) => {
    const { fabricInventoryId } = ctx.params
    const { body } = ctx.request

    try {
      await this.fabricInventoryService.updateFabricInventory(fabricInventoryId, body)
      const data = new SuccessObject(SuccessType.CREATED, `更新${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`更新${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getFabricInventoryById = async (ctx: Context) => {
    const { fabricInventoryId } = ctx.params

    try {
      const result = await this.fabricInventoryService.getFabricInventoryById(fabricInventoryId)
      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getFabricInventoryList = async (ctx: Context) => {
    const { skip, take } = ctx.request.body

    try {
      const result = await this.fabricInventoryService.getFabricInventoryList(skip, take, ctx.request.body)
      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }
}

export default FabricInventoryController
