import Router from '@koa/router'
import FabricController from '../../controller/inventory/fabric.controller'
import { verifyAuth } from '../../middleware/auth.middleware'

// 布料信息路由
const fabricRouter = new Router({ prefix: '/inventory/fabric' })
const fabricController = new FabricController()

// 添加布料数据
fabricRouter.post('/', verifyAuth, fabricController.createFabric)

// 删除指定布料数据
fabricRouter.delete('/:fabricId', verifyAuth, fabricController.deleteFabric)

// 修改指定布料数据
fabricRouter.put('/:fabricId', verifyAuth, fabricController.updateFabric)

// 查找指定布料数据
fabricRouter.get('/:fabricId', fabricController.getFabricById)

// 获取布料数据列表
fabricRouter.post('/list', fabricController.getFabricList)

export default fabricRouter
