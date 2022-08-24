import Router from 'koa-router'
import { verifyAuth } from '../../middleware/auth.middleware'

// 顾客信息路由
const customerRouter = new Router({ prefix: '/user/customer' })

// 添加顾客数据（没必要）
customerRouter.post('/', verifyAuth)

// 删除指定顾客数据
customerRouter.delete('/:customerId', verifyAuth)

// 修改指定顾客数据
customerRouter.put('./:customerId', verifyAuth)

// 查找指定顾客数据
customerRouter.get('/:customerId')

// 获取顾客数据列表
customerRouter.get('/')

export default customerRouter
