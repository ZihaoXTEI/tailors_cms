import Router from 'koa-router'
import fabricInboundController from '../../controller/inventory/fabricInbound.controller'
import FabricInbound from '../../entity/FabricInbound'
import { verifyAuth } from '../../middleware/auth.middleware'
import { usingValidation } from '../../middleware/global/validation.middleware'

// 布料入库信息路由
const fabricInboundRouter = new Router({ prefix: '/inventory/fabricinbound' })

// 添加布料入库数据
// 添加布料库存数据
fabricInboundRouter.post(
  '/',
  verifyAuth,
  usingValidation(FabricInbound),
  fabricInboundController.createFabricInbound
)

// 删除指定布料入库数据
// 更新布料库存数据
fabricInboundRouter.delete(
  '/:fabricInboundId',
  verifyAuth,
  fabricInboundController.deleteFabricInbound
)

// 修改指定布料入库数据
// 更新布料库存数据
fabricInboundRouter.put(
  './:fabricInboundId',
  verifyAuth,
  usingValidation(FabricInbound),
  fabricInboundController.updateFabricInbound
)

// 查找指定布料入库数据（根据 fabricInboundId）
fabricInboundRouter.get('/:fabricInboundId', fabricInboundController.getFabricInboundById)

// 获取布料入库数据列表
fabricInboundRouter.get('/', fabricInboundController.getFabricInboundList)

export default fabricInboundRouter
