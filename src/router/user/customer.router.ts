import Router from 'koa-router'
import CustomerController from '../../controller/user/customer.controller'
import Customer from '../../entity/Customer'
import { verifyAuth } from '../../middleware/auth.middleware'
import { usingValidation } from '../../middleware/global/validation.middleware'

// 顾客信息路由
const customerRouter = new Router({ prefix: '/user/customer' })
const customerController = new CustomerController()

// 添加顾客数据（没必要）
// customerRouter.post('/', verifyAuth, usingValidation(Customer), customerController.createCustomer)

// 删除指定顾客数据
customerRouter.delete('/:customerId', verifyAuth, customerController.deleteCustomer)

// 修改指定顾客数据
customerRouter.put('./:customerId', verifyAuth, usingValidation(Customer), customerController.updateCustomer)

// 查找指定顾客数据
customerRouter.get('/:customerId', verifyAuth, customerController.getCustomerById)

// 获取顾客数据列表
customerRouter.post('/list', verifyAuth, customerController.getCustomerList)

export default customerRouter
