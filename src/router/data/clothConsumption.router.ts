import Router from 'koa-router'
import { verifyAuth } from '../../middleware/auth.middleware'

// 布料消耗信息路由
const clothConsumptionRouter = new Router({ prefix: '/data/clothconsumption' })

// 添加布料消耗数据
clothConsumptionRouter.post('/', verifyAuth)

// 删除指定布料消耗数据
clothConsumptionRouter.delete('/:clothConsumptionId', verifyAuth)

// 修改指定布料消耗数据
clothConsumptionRouter.put('./:clothConsumptionId', verifyAuth)

// 查找指定布料消耗数据
clothConsumptionRouter.get('/:clothConsumptionId')

// 获取布料消耗数据列表
clothConsumptionRouter.get('/')

export default clothConsumptionRouter
