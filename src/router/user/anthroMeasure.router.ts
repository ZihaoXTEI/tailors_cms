import Router from 'koa-router'
import { verifyAuth } from '../../middleware/auth.middleware'

// 人体测量信息路由
const anthroMeasureRouter = new Router({ prefix: '/user/anthromeasure' })

// 添加人体测量数据
anthroMeasureRouter.post('/', verifyAuth)

// 删除指定人体测量数据
anthroMeasureRouter.delete('/:anthroMeasureId', verifyAuth)

// 修改指定人体测量数据
anthroMeasureRouter.put('./:anthroMeasureId', verifyAuth)

// 查找指定人体测量数据（根据 anthroMeasureId）
anthroMeasureRouter.get('/:anthroMeasureId')

// 获取人体测量数据列表
anthroMeasureRouter.get('/')

export default anthroMeasureRouter
