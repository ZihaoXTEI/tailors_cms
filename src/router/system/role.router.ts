import Router from '@koa/router'
import RoleController from '../../controller/system/role.controller'
import UserRoleController from '../../controller/system/userRole.controller'
import Role from '../../entity/Role'
import UserRole from '../../entity/UserRole'
import { verifyAuth } from '../../middleware/auth.middleware'
import { usingValidation } from '../../middleware/global/validation.middleware'

const roleController = new RoleController()
const userRoleController = new UserRoleController()

// 角色信息路由
const roleRouter = new Router({ prefix: '/system/role' })

// 添加角色数据
roleRouter.post('/', verifyAuth, usingValidation(Role), roleController.createRole)

// 删除指定角色数据
roleRouter.delete('/:roleId', verifyAuth, roleController.deleteRole)

// 修改指定角色数据
roleRouter.put('/:roleId', verifyAuth, usingValidation(Role), roleController.updateRole)

// 查找指定角色数据
roleRouter.get('/:roleId', verifyAuth, roleController.getRoleById)

// 获取角色数据列表
roleRouter.post('/list', verifyAuth, roleController.getRoleList)

// 用户角色信息路由
const userRoleRouter = new Router({ prefix: '/system/userrole' })

// 添加用户角色数据
userRoleRouter.post('/', verifyAuth, usingValidation(UserRole), userRoleController.createUserRole)

// 删除指定用户角色数据
userRoleRouter.delete('/:userRoleId', verifyAuth, userRoleController.deleteUserRole)

// 修改指定用户角色数据
userRoleRouter.put('/:userRoleId', verifyAuth, usingValidation(UserRole), userRoleController.updateUserRole)

// 查找指定用户角色数据
userRoleRouter.get('/:userRoleId', verifyAuth, userRoleController.getUserRoleById)

// 获取用户角色数据列表
userRoleRouter.post('/list', verifyAuth, userRoleController.getUserRoleList)

export { roleRouter, userRoleRouter }
