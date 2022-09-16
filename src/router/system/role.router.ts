import Router from 'koa-router'
import roleController from '../../controller/system/role.controller'
import Role from '../../entity/Role'
import { verifyAuth } from '../../middleware/auth.middleware'
import { usingValidation } from '../../middleware/global/validation.middleware'

// 角色信息路由
const roleRouter = new Router({ prefix: '/system/role' })

// 添加角色数据
roleRouter.post('/', verifyAuth, usingValidation(Role), roleController.create)

// 删除指定角色数据
roleRouter.delete('/:roleId', verifyAuth, roleController.delete)

// 修改指定角色数据
roleRouter.put('/:roleId', verifyAuth, usingValidation(Role), roleController.update)

// 查找指定角色数据
roleRouter.get('/:roleId', verifyAuth, roleController.getDataById)

// 获取角色数据列表
roleRouter.get('/', verifyAuth, roleController.getList)

export default roleRouter
