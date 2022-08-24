import Router from 'koa-router'
import { verifyAuth } from '../../middleware/auth.middleware'

// 布料入库信息路由
const fabricInboundRouter = new Router({ prefix: '/inventory/fabricinbound' })

// 添加布料入库数据
// 添加布料库存数据
fabricInboundRouter.post('/', verifyAuth)

// 删除指定布料入库数据
// 更新布料库存数据
fabricInboundRouter.delete('/:fabricInboundId', verifyAuth)

// 修改指定布料入库数据
// 更新布料库存数据
fabricInboundRouter.put('./:fabricInboundId', verifyAuth)

// 查找指定布料入库数据（根据 fabricInboundId）
fabricInboundRouter.get('/:fabricInboundId')

// 获取布料入库数据列表
fabricInboundRouter.get('/')

export default fabricInboundRouter
