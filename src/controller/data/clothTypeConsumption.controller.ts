import { Context } from 'koa'
import ErrorType from '../../constant/errorType'
import SuccessType from '../../constant/successType'
import ClothTypeConsumptionService from '../../service/data/clothTypeConsumption.service'
import ErrorObject from '../../utils/errorObject'
import SuccessObject from '../../utils/successObject'

class ClothTypeConsumptionController {
  private clothTypeConsumptionService = new ClothTypeConsumptionService()
  private chineseName = '布料用料'

  createClothTypeConsumption = async (ctx: Context) => {
    const { body } = ctx.request

    try {
      await this.clothTypeConsumptionService.insert(body)
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

  deleteClothTypeConsumption = async (ctx: Context) => {
    const { clothTypeConsumptionId } = ctx.params
    console.log(clothTypeConsumptionId)

    try {
      await this.clothTypeConsumptionService.delete(clothTypeConsumptionId)
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

  updateClothTypeConsumption = async (ctx: Context) => {
    const { clothTypeConsumptionId } = ctx.params
    const { body } = ctx.request

    try {
      await this.clothTypeConsumptionService.update(clothTypeConsumptionId, body)
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

  getClothTypeConsumptionById = async (ctx: Context) => {
    const { clothTypeConsumptionId } = ctx.params

    try {
      const result = await this.clothTypeConsumptionService.getById(clothTypeConsumptionId)
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

  getClothTypeConsumptionList = async (ctx: Context) => {
    const { skip, take } = ctx.request.body

    try {
      const result = await this.clothTypeConsumptionService.getList(skip, take)
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

export default new ClothTypeConsumptionController()
