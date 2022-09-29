import Router from 'koa-router'
import FabricTypeController from '../../controller/data/fabricType.controller'
import FabricType from '../../entity/FabricType'
import { verifyAuth } from '../../middleware/auth.middleware'
import { usingValidation } from '../../middleware/global/validation.middleware'

// 布料类型信息路由
const fabricTypeRouter = new Router({ prefix: '/data/fabrictype' })
const fabricTypeController = new FabricTypeController()

// 添加布料类型数据
fabricTypeRouter.post('/', verifyAuth, usingValidation(FabricType), fabricTypeController.createFabricType)

// 删除指定布料类型数据
fabricTypeRouter.delete('/:fabricTypeId', verifyAuth, fabricTypeController.deleteFabricType)

// 修改指定布料类型数据
fabricTypeRouter.put('./:fabricTypeId', verifyAuth, usingValidation(FabricType), fabricTypeController.updateFabricType)

// 查找指定布料类型数据
fabricTypeRouter.get('/:fabricTypeId', fabricTypeController.getFabricTypeById)

// 获取布料类型数据列表
fabricTypeRouter.post('/list', fabricTypeController.getFabricTypeList)

export default fabricTypeRouter
