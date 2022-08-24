import Router from 'koa-router'
import { verifyAuth } from '../../middleware/auth.middleware'

// 服装类型信息路由
const clothTypeRouter = new Router({ prefix: '/data/clothtype' })

// 添加服装类型数据
clothTypeRouter.post('/', verifyAuth)

// 删除指定服装类型数据
clothTypeRouter.delete('/:clothTypeId', verifyAuth)

// 修改指定服装类型数据
clothTypeRouter.put('./:clothTypeId', verifyAuth)

// 查找指定服装类型数据
clothTypeRouter.get('/:clothTypeId')

// 获取服装类型数据列表
clothTypeRouter.get('/')

export default clothTypeRouter
