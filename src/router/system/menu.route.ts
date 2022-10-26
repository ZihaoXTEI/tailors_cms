import Router from '@koa/router'
import menuController from '../../controller/system/menu.controller'
import Menu from '../../entity/Menu'
import { verifyAuth } from '../../middleware/auth.middleware'
import { usingValidation } from '../../middleware/global/validation.middleware'

// 菜单信息路由
const menuRouter = new Router({ prefix: '/system/menu' })

// 添加菜单数据
menuRouter.post('/', verifyAuth, usingValidation(Menu), menuController.createMenu)

// 删除指定菜单数据
menuRouter.delete('/:menuId', verifyAuth, menuController.deleteMenu)

// 修改指定菜单数据
menuRouter.put('/:menuId', verifyAuth, usingValidation(Menu), menuController.updateMenu)

// 查找指定菜单数据
menuRouter.get('/:menuId', verifyAuth, menuController.getMenuById)

// 获取菜单数据列表
menuRouter.post('/list', verifyAuth, menuController.getMenuList)

export default menuRouter
