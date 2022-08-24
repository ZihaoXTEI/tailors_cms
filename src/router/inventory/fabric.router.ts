import Router from 'koa-router'
import { verifyAuth } from '../../middleware/auth.middleware'

// 布料信息路由
const fabricRouter = new Router({ prefix: '/inventory/fabric' })

// 添加布料数据
fabricRouter.post('/', verifyAuth)

// 删除指定布料数据
fabricRouter.delete('/:fabricId', verifyAuth)

// put>patch
// 修改指定布料数据
fabricRouter.put('./:fabricId', verifyAuth)

// 查找指定布料数据
fabricRouter.get('/:fabricId')

// 获取布料数据列表
fabricRouter.get('/')

export default fabricRouter
