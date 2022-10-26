import { Context } from 'koa'
import ErrorType from '../../constant/errorType'
import SuccessType from '../../constant/successType'
import CustomerFavoriteService from '../../service/user/customerFavorite.service'

import ErrorObject from '../../utils/errorObject'
import SuccessObject from '../../utils/successObject'

class CustomerFavoriteController {
  private customerFavoriteService = new CustomerFavoriteService()
  private chineseName = '顾客收藏布料'

  createCustomerFavorite = async (ctx: Context) => {
    const { body } = ctx.request

    try {
      await this.customerFavoriteService.insertCustomerFavorite(body)
      const data = new SuccessObject(SuccessType.CREATED, `添加${this.chineseName}数据成功`)
      ctx.status = SuccessType.CREATED
      ctx.body = data
    } catch (err) {
      console.log('[ERROR]', err)
      const error = new ErrorObject(`添加${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  deleteCustomerFavorite = async (ctx: Context) => {
    const { customerFavoriteId } = ctx.params

    try {
      await this.customerFavoriteService.deleteCustomerFavorite(customerFavoriteId)
      const data = new SuccessObject(SuccessType.OK, `删除${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`删除${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  updateCustomerFavorite = async (ctx: Context) => {
    const { customerFavoriteId } = ctx.params
    const { body } = ctx.request

    try {
      await this.customerFavoriteService.updateCustomerFavorite(customerFavoriteId, body)
      const data = new SuccessObject(SuccessType.CREATED, `更新${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`更新${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getCustomerFavoriteById = async (ctx: Context) => {
    const { customerFavoriteId } = ctx.params

    try {
      const result = await this.customerFavoriteService.getCustomerFavoriteById(customerFavoriteId)

      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getCustomerFavoriteList = async (ctx: Context) => {
    const { skip, take } = ctx.request.body

    try {
      const result = await this.customerFavoriteService.getCustomerFavoriteList(skip, take, ctx.request.body)

      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }
}

export default CustomerFavoriteController
