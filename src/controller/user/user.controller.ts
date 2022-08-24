import { Context } from 'koa'
import userService from '../../service/user.service'
import User from '../../entity/User'
import { ClientType } from '../../types/entityType'
import Staff from '../../entity/Staff'
import ErrorObject from '../../utils/errorObject'
import ErrorType from '../../constant/errorType'
import Customer from '../../entity/Customer'

class UserController {
  // 创建用户
  async createUser(ctx: Context) {
    const requestBody = ctx.request.body
    const clientType = requestBody.clientType

    const user = new User()
    user.nickname = requestBody.username
    user.password = requestBody.password

    let result = null

    // 需要同时为该角色赋予角色

    // 根据角色创建 顾客表/员工表
    if (clientType === ClientType.CMS) {
      const staff = new Staff()
      const { staffInfo } = requestBody
      staff.staffName = staffInfo.staffName
      staff.staffGender = staffInfo.staffGender
      staff.staffSalary = staffInfo.staffSalary
      staff.staffEntrydate = staffInfo.staffEntrydate
      staff.staffPhone = staffInfo.staffPhone
      staff.staffAddress = staffInfo.staffAddress

      try {
        result = await userService.createStaff(user, staff)
      } catch {
        const error = new ErrorObject('服务器错误，请联系管理员', ErrorType.INTERNAL_SERVER_ERROR)
        return ctx.app.emit('error', error, ctx)
      }
    } else if (clientType === ClientType.SHOP) {
      const customer = new Customer()
      const { customerInfo } = requestBody
      customer.customerName = customerInfo.customerName
      customer.customerGender = customerInfo.customerGender
      customer.customerPhone = customerInfo.customerPhone
      customer.customerAddress = customerInfo.customerAddress

      try {
        result = await userService.createCustomer(user, customer)
      } catch {
        const error = new ErrorObject('服务器错误，请联系管理员', ErrorType.INTERNAL_SERVER_ERROR)
        return ctx.app.emit('error', error, ctx)
      }
    }

    ctx.body = result
  }
}

export default new UserController()
