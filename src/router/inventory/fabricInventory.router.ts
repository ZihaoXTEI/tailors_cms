import Router from 'koa-router'
import { verifyAuth } from '../../middleware/auth.middleware'

// 布料库存信息路由
const fabricInventoryRouter = new Router({ prefix: '/inventory/fabricinventory' })

// 添加布料库存数据
fabricInventoryRouter.post('/', verifyAuth)

// 删除指定布料库存数据
fabricInventoryRouter.delete('/:fabricInventoryId', verifyAuth)

// 修改指定布料库存数据
fabricInventoryRouter.put('./:fabricInventoryId', verifyAuth)

// 查找指定布料库存数据（根据 fabricInventoryId）
fabricInventoryRouter.get('/:fabricInventoryId')

// 获取布料库存数据列表
fabricInventoryRouter.get('/')

export default fabricInventoryRouter
