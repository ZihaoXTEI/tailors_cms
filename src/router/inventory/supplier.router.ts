import Router from 'koa-router'
import { verifyAuth } from '../../middleware/auth.middleware'

// 供应商信息路由
const supplierRouter = new Router({ prefix: '/inventory/supplier' })

// 添加供应商数据
supplierRouter.post('/', verifyAuth)

// 删除指定供应商数据
supplierRouter.delete('/:supplierId', verifyAuth)

// 修改指定供应商数据
supplierRouter.put('./:supplierId', verifyAuth)

// 查找指定供应商数据
supplierRouter.get('/:supplierId')

// 获取供应商数据列表
supplierRouter.get('/')

export default supplierRouter
