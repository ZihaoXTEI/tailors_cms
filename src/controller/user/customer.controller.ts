import { Context } from 'koa'
import ErrorType from '../../constant/errorType'
import SuccessType from '../../constant/successType'
import CustomerService from '../../service/user/customer.service'

import ErrorObject from '../../utils/errorObject'
import { objectArrayFlat, objectFlat } from '../../utils/objectUtil'
import SuccessObject from '../../utils/successObject'

class CustomerController {
  private customerService = new CustomerService()
  private chineseName = '顾客'

  createCustomer = async (ctx: Context) => {
    const { body } = ctx.request

    try {
      await this.customerService.insertCustomer(body)
      const data = new SuccessObject(SuccessType.CREATED, `添加${this.chineseName}数据成功`)
      ctx.status = SuccessType.CREATED
      ctx.body = data
    } catch (err) {
      console.log('[ERROR]', err)
      const error = new ErrorObject(`添加${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  deleteCustomer = async (ctx: Context) => {
    const { customerId } = ctx.params

    try {
      await this.customerService.deleteCustomer(customerId)
      const data = new SuccessObject(SuccessType.OK, `删除${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`删除${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  updateCustomer = async (ctx: Context) => {
    const { customerId } = ctx.params
    const { body } = ctx.request

    try {
      await this.customerService.updateCustomer(customerId, body)
      const data = new SuccessObject(SuccessType.CREATED, `更新${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`更新${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getCustomerById = async (ctx: Context) => {
    const { customerId } = ctx.params

    try {
      const result = await this.customerService.getCustomerById(customerId)
      const processedData = objectFlat(result, 'user', ['nickname', 'password', 'avatar'])

      console.log(processedData)

      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, processedData)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getCustomerList = async (ctx: Context) => {
    const { skip, take } = ctx.request.body

    try {
      const result = await this.customerService.getCustomerList(skip, take, ctx.request.body)
      const processedData = objectArrayFlat(result.list, 'user', ['nickname', 'avatar'])

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

export default CustomerController
