import Router from '@koa/router'
import OptionController from '../../controller/view/option.controller'
import { verifyAuth } from '../../middleware/auth.middleware'

const optionRouter = new Router({ prefix: '/option' })
const optionController = new OptionController()

// 服装类型
optionRouter.get('/clothtype', verifyAuth, optionController.getClothTypeOption)

// 布料类型
optionRouter.get('/fabrictype', verifyAuth, optionController.getFabricTypeOption)

// 布料
optionRouter.get('/fabric', verifyAuth, optionController.getFabricOption)

// 供应商
optionRouter.get('/supplier', verifyAuth, optionController.getSupplierOption)

// 职工
optionRouter.get('/staff', verifyAuth, optionController.getStaffOption)

// 顾客
optionRouter.get('/customer', verifyAuth, optionController.getCustomerOption)

// 菜单
optionRouter.get('/menu', verifyAuth, optionController.getMenuOption)

// 角色
optionRouter.get('/role', verifyAuth, optionController.getRoleOption)

// 权限
optionRouter.get('/permission', verifyAuth, optionController.getPermisionOption)

export default optionRouter
