import { Context } from 'koa'
import ErrorType from '../../constant/errorType'
import SuccessType from '../../constant/successType'
import clothTypeService from '../../service/data/clothType.service'
import ErrorObject from '../../utils/errorObject'
import SuccessObject from '../../utils/successObject'

class ClothTypeController {
  async createClothType(ctx: Context) {
    const { body } = ctx.request

    try {
      await clothTypeService.insertClothType(body)
      const data = new SuccessObject(SuccessType.CREATED, '添加服装类型数据成功')
      ctx.status = SuccessType.CREATED
      ctx.body = data
    } catch (err) {
      console.log('[ERROR]', (err as any).code)
      console.log(err)
      const error = new ErrorObject('添加服装类型数据错误', ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  async deleteClothType(ctx: Context) {
    const { clothTypeId } = ctx.params
    console.log(clothTypeId)

    try {
      await clothTypeService.deleteClothType(clothTypeId)
      const data = new SuccessObject(SuccessType.OK, '删除装类型数据成功')
      ctx.body = data
    } catch {
      const error = new ErrorObject('删除服装类型数据错误', ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  async updateClothType(ctx: Context) {
    const { clothTypeId } = ctx.params
    const { body } = ctx.request

    try {
      await clothTypeService.updateClothType(clothTypeId, body)
      const data = new SuccessObject(SuccessType.CREATED, '更新服装类型数据成功')
      ctx.body = data
    } catch {
      const error = new ErrorObject('更新服装类型数据错误', ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  async getClothTypeById(ctx: Context) {
    const { clothTypeId } = ctx.params

    try {
      const result = await clothTypeService.getClothTypeById(clothTypeId)
      const data = new SuccessObject(SuccessType.OK, '获取数据成功', result)
      ctx.body = data
    } catch {
      const error = new ErrorObject('获取服装类型数据错误', ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  async getClothTypeList(ctx: Context) {
    const { skip, take } = ctx.request.body

    console.log(ctx.request.body)

    try {
      const result = await clothTypeService.getClothTypeList(skip, take, ctx.request.body)
      const data = new SuccessObject(SuccessType.OK, '获取数据成功', result)
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject('获取服装类型数据错误', ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  async getClothTypeByName(ctx: Context) {
    return null
  }
}

export default new ClothTypeController()
