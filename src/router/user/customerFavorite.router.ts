import Router from '@koa/router'
import CustomerFavoriteController from '../../controller/user/customerFavorite.controller'
import Favorite from '../../entity/Favorite'
import { verifyAuth } from '../../middleware/auth.middleware'
import { usingValidation } from '../../middleware/global/validation.middleware'

// 顾客布料收藏信息路由
const customerFavoriteRouter = new Router({ prefix: '/user/customerfavorite' })
const customerFavoriteController = new CustomerFavoriteController()

// 添加布料收藏顾客数据
customerFavoriteRouter.post(
  '/',
  verifyAuth,
  usingValidation(Favorite),
  customerFavoriteController.createCustomerFavorite
)

// 删除指定顾客布料收藏数据
customerFavoriteRouter.delete('/:customerFavoriteId', verifyAuth, customerFavoriteController.deleteCustomerFavorite)

// 修改指定顾客布料收藏数据
customerFavoriteRouter.put(
  './:customerFavoriteId',
  verifyAuth,
  usingValidation(Favorite),
  customerFavoriteController.updateCustomerFavorite
)

// 查找指定顾客布料收藏数据
customerFavoriteRouter.get('/:customerFavoriteId', verifyAuth, customerFavoriteController.getCustomerFavoriteById)

// 获取顾客布料收藏数据列表
customerFavoriteRouter.post('/list', verifyAuth, customerFavoriteController.getCustomerFavoriteList)

export default customerFavoriteRouter
