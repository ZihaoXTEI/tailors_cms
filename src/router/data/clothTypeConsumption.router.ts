import Router from 'koa-router'
import clothTypeConsumptionController from '../../controller/data/clothTypeConsumption.controller'
import { verifyAuth } from '../../middleware/auth.middleware'

// 布料消耗信息路由
const clothTypeConsumptionRouter = new Router({ prefix: '/data/clothtypeconsumption' })

// 添加布料消耗数据
clothTypeConsumptionRouter.post(
  '/',
  verifyAuth,
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
  clothTypeConsumptionController.updateClothTypeConsumption
)

// 查找指定布料消耗数据
clothTypeConsumptionRouter.get(
  '/:clothConsumptionId',
  clothTypeConsumptionController.getClothTypeConsumptionById
)

// 获取布料消耗数据列表
clothTypeConsumptionRouter.get('/', clothTypeConsumptionController.getClothTypeConsumptionList)

export default clothTypeConsumptionRouter
