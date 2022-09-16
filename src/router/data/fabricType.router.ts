import Router from 'koa-router'
import FabricTypeController from '../../controller/data/fabricType.controller'
import { verifyAuth } from '../../middleware/auth.middleware'

// 布料类型信息路由
const fabricTypeRouter = new Router({ prefix: '/data/fabrictype' })
const fabricTypeController = new FabricTypeController()

// 添加布料类型数据
fabricTypeRouter.post('/', verifyAuth, fabricTypeController.createClothType)

// 删除指定布料类型数据
fabricTypeRouter.delete('/:fabricTypeId', verifyAuth, fabricTypeController.deleteClothType)

// 修改指定布料类型数据
fabricTypeRouter.put('./:fabricTypeId', verifyAuth, fabricTypeController.updateClothType)

// 查找指定布料类型数据
fabricTypeRouter.get('/:fabricTypeId', fabricTypeController.getClothTypeById)

// 获取布料类型数据列表
fabricTypeRouter.get('/', fabricTypeController.getClothTypeList)

export default fabricTypeRouter
