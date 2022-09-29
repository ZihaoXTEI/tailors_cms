import Router from 'koa-router'
import clothTypeConsumptionController from '../../controller/data/clothTypeConsumption.controller'
import ClothTypeConsumption from '../../entity/ClothTypeConsumption'
import { verifyAuth } from '../../middleware/auth.middleware'
import { usingValidation } from '../../middleware/global/validation.middleware'

// 布料消耗信息路由
const clothTypeConsumptionRouter = new Router({ prefix: '/data/clothtypeconsumption' })

// 添加布料消耗数据
clothTypeConsumptionRouter.post(
  '/',
  verifyAuth,
  usingValidation(ClothTypeConsumption),
  clothTypeConsumptionController.createClothTypeConsumption
)

// 删除指定布料消耗数据
clothTypeConsumptionRouter.delete(
  '/:clothConsumptionId',
  verifyAuth,
  clothTypeConsumptionController.deleteClothTypeConsumption
)

// 修改指定布料消耗数据
clothTypeConsumptionRouter.put(
  './:clothConsumptionId',
  verifyAuth,
  usingValidation(ClothTypeConsumption),
  clothTypeConsumptionController.updateClothTypeConsumption
)

// 查找指定布料消耗数据
clothTypeConsumptionRouter.get('/:clothConsumptionId', clothTypeConsumptionController.getClothTypeConsumptionById)

// 获取布料消耗数据列表
clothTypeConsumptionRouter.post('/list', clothTypeConsumptionController.getClothTypeConsumptionList)

export default clothTypeConsumptionRouter
