import Router from 'koa-router'
import permissionController from '../../controller/system/permission.controller'
import Permission from '../../entity/Permission'
import { verifyAuth } from '../../middleware/auth.middleware'
import { usingValidation } from '../../middleware/global/validation.middleware'

// 角色信息路由
const permissionRouter = new Router({ prefix: '/system/permission' })

// 添加角色数据
permissionRouter.post(
  '/',
  verifyAuth,
  usingValidation(Permission),
  permissionController.createPermission
)

// 删除指定角色数据
permissionRouter.delete('/:permissionId', verifyAuth, permissionController.deletePermission)

// 修改指定角色数据
permissionRouter.put(
  '/:permissionId',
  verifyAuth,
  usingValidation(Permission),
  permissionController.updatePermission
)

// 查找指定角色数据
permissionRouter.get('/id/:permissionId', verifyAuth, permissionController.getPermissionById)

// 获取角色数据列表
permissionRouter.get('/', verifyAuth, permissionController.getPermissionList)

// 根据角色 ID 获取角色数据列表
permissionRouter.get('/role/:roleId', verifyAuth, permissionController.getPermissionListByRoleId)

permissionRouter.get('/init', permissionController.initData)

export default permissionRouter
