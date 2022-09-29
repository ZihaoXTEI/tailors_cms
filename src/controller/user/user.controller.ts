import { Context } from 'koa'
import userService from '../../service/user/user.service'
import User from '../../entity/User'
import { ClientType } from '../../types/entityType'
import Staff from '../../entity/Staff'
import ErrorObject from '../../utils/errorObject'
import ErrorType from '../../constant/errorType'
import Customer from '../../entity/Customer'
import SuccessObject from '../../utils/successObject'
import SuccessType from '../../constant/successType'

class UserController {
  private chineseName = '用户'

  // 创建用户
  createUser = async (ctx: Context) => {
    const requestBody = ctx.request.body
    const { clientType } = ctx.params

    console.log('clientType', clientType == ClientType.CMS)
    console.log(typeof clientType)
    console.log(typeof ClientType.CMS)

    const user = new User()
    user.nickname = requestBody.nickname
    user.password = requestBody.password

    let result = null

    // 需要同时为该角色赋予角色

    // 根据角色创建 顾客表/员工表
    if (clientType == ClientType.CMS) {
      console.log(requestBody)
      const staff = new Staff()
      staff.staffName = requestBody.staffName
      staff.staffGender = requestBody.staffGender
      staff.staffSalary = requestBody.staffSalary ?? 0
      staff.staffEntrydate = requestBody.staffEntrydate ?? new Date()
      staff.staffPhone = requestBody.staffPhone ?? ''
      staff.staffAddress = requestBody.staffAddress ?? ''

      try {
        result = await userService.createStaff(user, staff)
      } catch (err) {
        console.log(err)
        const error = new ErrorObject('服务器错误，请联系管理员', ErrorType.INTERNAL_SERVER_ERROR)
        return ctx.app.emit('error', error, ctx)
      }
    } else if (clientType == ClientType.SHOP) {
      const customer = new Customer()
      customer.customerName = requestBody.customerName
      customer.customerGender = requestBody.customerGender
      customer.customerPhone = requestBody.customerPhone
      customer.customerAddress = requestBody.customerAddress

      try {
        result = await userService.createCustomer(user, customer)
      } catch {
        const error = new ErrorObject('服务器错误，请联系管理员', ErrorType.INTERNAL_SERVER_ERROR)
        return ctx.app.emit('error', error, ctx)
      }
    }

    ctx.body = result
  }

  deleteUser = async (ctx: Context) => {
    const { userId } = ctx.params
  }

  updateUser = async (ctx: Context) => {
    const { userId } = ctx.params
  }

  getUserById = async (ctx: Context) => {
    const { userId } = ctx.params
    console.log(userId)

    try {
      const result = await userService.getUserById(userId)
      console.log(result)
      if (result) {
        result.password = ''
        const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
        ctx.body = data
      } else {
        const error = new ErrorObject(`获取${this.chineseName}数据为空`, ErrorType.BAD_REQUEST)
        return ctx.app.emit('error', error, ctx)
      }
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }
}

export default new UserController()
