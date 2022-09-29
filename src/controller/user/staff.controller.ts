import { Context } from 'koa'
import ErrorType from '../../constant/errorType'
import SuccessType from '../../constant/successType'
import StaffService from '../../service/user/staff.service'

import ErrorObject from '../../utils/errorObject'
import { objectFlat, objectArrayFlat } from '../../utils/objectUtil'
import SuccessObject from '../../utils/successObject'

class StaffController {
  private staffService = new StaffService()
  private chineseName = '职员'

  createStaff = async (ctx: Context) => {
    const { body } = ctx.request

    try {
      await this.staffService.insertStaff(body)
      const data = new SuccessObject(SuccessType.CREATED, `添加${this.chineseName}数据成功`)
      ctx.status = SuccessType.CREATED
      ctx.body = data
    } catch (err) {
      console.log('[ERROR]', err)
      const error = new ErrorObject(`添加${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  deleteStaff = async (ctx: Context) => {
    const { staffId } = ctx.params

    try {
      await this.staffService.deleteStaff(staffId)
      const data = new SuccessObject(SuccessType.OK, `删除${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`删除${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  updateStaff = async (ctx: Context) => {
    const { staffId } = ctx.params
    const { body } = ctx.request

    try {
      await this.staffService.updateStaff(staffId, body)
      const data = new SuccessObject(SuccessType.CREATED, `更新${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`更新${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getStaffById = async (ctx: Context) => {
    const { staffId } = ctx.params

    console.log(staffId)

    try {
      const result = await this.staffService.getStaffById(staffId)
      const processedData = objectFlat(result, 'user', ['nickname', 'password', 'avatar'])

      console.log(processedData)

      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, processedData)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getStaffList = async (ctx: Context) => {
    const { skip, take } = ctx.request.body

    try {
      const result = await this.staffService.getStaffList(skip, take, ctx.request.body)
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

export default StaffController
