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

  getUserInfo = async (ctx: Context) => {
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
      const error = new ErrorObject(
        `获取${this.chineseName}数据错误`,
        ErrorType.INTERNAL_SERVER_ERROR
      )
      return ctx.app.emit('error', error, ctx)
    }
  }
}

export default new UserController()
