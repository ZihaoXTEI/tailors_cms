import Router from 'koa-router'
import { verifyAuth } from '../../middleware/auth.middleware'

// 职员信息路由
const staffRouter = new Router({ prefix: '/user/staff' })

// 添加职员数据（没必要）
staffRouter.post('/', verifyAuth)

// 删除指定职员数据
staffRouter.delete('/:staffId', verifyAuth)

// 修改指定职员数据
staffRouter.put('./:staffId', verifyAuth)

// 查找指定职员数据
staffRouter.get('/:staffId')

// 获取职员数据列表
staffRouter.get('/')

export default staffRouter
