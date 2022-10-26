import { Context } from 'koa'
import ErrorType from '../../constant/errorType'
import SuccessType from '../../constant/successType'
import AnthroMeasureService from '../../service/user/anthroMeasure.service'

import ErrorObject from '../../utils/errorObject'
import SuccessObject from '../../utils/successObject'

class AnthroMeasureController {
  private anthroMeasureService = new AnthroMeasureService()
  private chineseName = '顾客量体'

  createAnthroMeasure = async (ctx: Context) => {
    const { body } = ctx.request

    try {
      await this.anthroMeasureService.insertAnthroMeasure(body)
      const data = new SuccessObject(SuccessType.CREATED, `添加${this.chineseName}数据成功`)
      ctx.status = SuccessType.CREATED
      ctx.body = data
    } catch (err) {
      console.log('[ERROR]', err)
      const error = new ErrorObject(`添加${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  deleteAnthroMeasure = async (ctx: Context) => {
    const { anthroMeasureId } = ctx.params

    try {
      await this.anthroMeasureService.deleteAnthroMeasure(anthroMeasureId)
      const data = new SuccessObject(SuccessType.OK, `删除${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`删除${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  updateAnthroMeasure = async (ctx: Context) => {
    const { anthroMeasureId } = ctx.params
    const { body } = ctx.request

    try {
      await this.anthroMeasureService.updateAnthroMeasure(anthroMeasureId, body)
      const data = new SuccessObject(SuccessType.CREATED, `更新${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`更新${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getAnthroMeasureById = async (ctx: Context) => {
    const { anthroMeasureId } = ctx.params

    try {
      const result = await this.anthroMeasureService.getAnthroMeasureById(anthroMeasureId)

      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getAnthroMeasureList = async (ctx: Context) => {
    const { skip, take } = ctx.request.body

    try {
      const result = await this.anthroMeasureService.getAnthroMeasureList(skip, take, ctx.request.body)

      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }
}

export default AnthroMeasureController
