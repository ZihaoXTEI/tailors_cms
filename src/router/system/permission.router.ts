import Router from '@koa/router'
import PermissionController from '../../controller/system/permission.controller'
import RolePermissionController from '../../controller/system/rolePermission.controller'
import Permission from '../../entity/Permission'
import RolePermission from '../../entity/RolePermission'
import { verifyAuth } from '../../middleware/auth.middleware'
import { usingValidation } from '../../middleware/global/validation.middleware'

const permissionController = new PermissionController()
const rolePermissionController = new RolePermissionController()

// 角色信息路由
const permissionRouter = new Router({ prefix: '/system/permission' })

// 添加角色数据
permissionRouter.post('/', verifyAuth, usingValidation(Permission), permissionController.createPermission)

// 删除指定角色数据
permissionRouter.delete('/:permissionId', verifyAuth, permissionController.deletePermission)

// 修改指定角色数据
permissionRouter.put('/:permissionId', verifyAuth, usingValidation(Permission), permissionController.updatePermission)

// 查找指定角色数据
permissionRouter.get('/id/:permissionId', verifyAuth, permissionController.getPermissionById)

// 获取角色数据列表
permissionRouter.post('/list', verifyAuth, permissionController.getPermissionList)

// 根据角色 ID 获取角色数据列表
permissionRouter.get('/role/:roleId', verifyAuth, permissionController.getPermissionListByRoleId)

permissionRouter.get('/init', permissionController.initData)

// 角色权限信息路由
const rolePermissionRouter = new Router({ prefix: '/system/rolepermission' })

// 添加角色权限数据
rolePermissionRouter.post(
  '/',
  verifyAuth,
  usingValidation(RolePermission),
  rolePermissionController.createRolePermission
)

// 删除指定角色权限数据
rolePermissionRouter.delete('/:userRoleId', verifyAuth, rolePermissionController.deleteRolePermission)

// 修改指定角色权限数据
rolePermissionRouter.put(
  '/:userRoleId',
  verifyAuth,
  usingValidation(RolePermission),
  rolePermissionController.updateRolePermission
)

// 查找指定角色权限数据
rolePermissionRouter.get('/:userRoleId', verifyAuth, rolePermissionController.getRolePermissionById)

// 获取角色权限数据列表
rolePermissionRouter.post('/list', verifyAuth, rolePermissionController.getRolePermissionList)

export { permissionRouter, rolePermissionRouter }
