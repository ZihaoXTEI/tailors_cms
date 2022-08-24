import Router from 'koa-router'
import { verifyAuth } from '../../middleware/auth.middleware'

// 布料类型信息路由
const fabricTypeRouter = new Router({ prefix: '/data/fabrictype' })

// 添加布料类型数据
fabricTypeRouter.post('/', verifyAuth)

// 删除指定布料类型数据
fabricTypeRouter.delete('/:fabricTypeId', verifyAuth)

// 修改指定布料类型数据
fabricTypeRouter.put('./:fabricTypeId', verifyAuth)

// 查找指定布料类型数据
fabricTypeRouter.get('/:fabricTypeId')

// 获取布料类型数据列表
fabricTypeRouter.get('/')

export default fabricTypeRouter
