import Router from '@koa/router'
import FabricInventoryController from '../../controller/inventory/fabricInventory.controller'
import { verifyAuth } from '../../middleware/auth.middleware'

// 布料库存信息路由
const fabricInventoryRouter = new Router({ prefix: '/inventory/fabricinventory' })
const fabricInventoryController = new FabricInventoryController()

// 添加布料库存数据
fabricInventoryRouter.post('/', verifyAuth, fabricInventoryController.createFabricInventory)

// 删除指定布料库存数据
fabricInventoryRouter.delete('/:fabricInventoryId', verifyAuth, fabricInventoryController.deleteFabricInventory)

// 修改指定布料库存数据
fabricInventoryRouter.put('/:fabricInventoryId', verifyAuth, fabricInventoryController.updateFabricInventory)

// 查找指定布料库存数据（根据 fabricInventoryId）
fabricInventoryRouter.get('/:fabricInventoryId', fabricInventoryController.getFabricInventoryById)

// 获取布料库存数据列表
fabricInventoryRouter.post('/list', fabricInventoryController.getFabricInventoryList)

export default fabricInventoryRouter
