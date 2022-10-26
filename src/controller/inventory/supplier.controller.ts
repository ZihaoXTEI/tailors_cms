import { Context } from 'koa'
import ErrorType from '../../constant/errorType'
import SuccessType from '../../constant/successType'
import SupplierService from '../../service/inventory/supplier.service'
import ErrorObject from '../../utils/errorObject'
import SuccessObject from '../../utils/successObject'

class SupplierController {
  private supplierService = new SupplierService()
  private chineseName = '供应商'

  createSupplier = async (ctx: Context) => {
    const { body } = ctx.request
    console.log(body)

    try {
      await this.supplierService.insert(body)
      const data = new SuccessObject(SuccessType.CREATED, `添加${this.chineseName}数据成功`)
      ctx.status = SuccessType.CREATED
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`添加${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  deleteSupplier = async (ctx: Context) => {
    const { supplierId } = ctx.params
    console.log(supplierId)

    try {
      await this.supplierService.delete(supplierId)
      const data = new SuccessObject(SuccessType.OK, `删除${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`删除${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  updateSupplier = async (ctx: Context) => {
    const { supplierId } = ctx.params
    const { body } = ctx.request

    try {
      await this.supplierService.update(supplierId, body)
      const data = new SuccessObject(SuccessType.CREATED, `更新${this.chineseName}数据成功`)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`更新${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getSupplierById = async (ctx: Context) => {
    const { supplierId } = ctx.params

    try {
      const result = await this.supplierService.getById(supplierId)
      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
      ctx.body = data
    } catch {
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getSupplierList = async (ctx: Context) => {
    const { skip, take } = ctx.request.body

    try {
      const result = await this.supplierService.getList(skip, take, ctx.request.body)
      const data = new SuccessObject(SuccessType.OK, `获取${this.chineseName}数据成功`, result)
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`获取${this.chineseName}数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }
}

export default new SupplierController()
