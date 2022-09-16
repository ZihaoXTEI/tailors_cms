import Router from 'koa-router'
import clothTypeController from '../../controller/data/clothType.controller'
import { verifyAuth } from '../../middleware/auth.middleware'

// 服装类型信息路由
const clothTypeRouter = new Router({ prefix: '/data/clothtype' })

// 添加服装类型数据
clothTypeRouter.post('/', verifyAuth, clothTypeController.createClothType)

// 删除指定服装类型数据
clothTypeRouter.delete('/:clothTypeId', verifyAuth, clothTypeController.deleteClothType)

// 修改指定服装类型数据
clothTypeRouter.put('/:clothTypeId', verifyAuth, clothTypeController.updateClothType)

// 查找指定服装类型数据
clothTypeRouter.get('/:clothTypeId', clothTypeController.getClothTypeById)

// 获取服装类型数据列表
clothTypeRouter.get('/', clothTypeController.getClothTypeList)

export default clothTypeRouter
