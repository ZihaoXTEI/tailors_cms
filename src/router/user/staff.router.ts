import Router from 'koa-router'
import StaffController from '../../controller/user/staff.controller'
import Staff from '../../entity/Staff'
import { verifyAuth } from '../../middleware/auth.middleware'
import { usingValidation } from '../../middleware/global/validation.middleware'

// 职员信息路由
const staffRouter = new Router({ prefix: '/user/staff' })
const staffController = new StaffController()

// 添加职员数据（没必要）
// staffRouter.post('/', verifyAuth, usingValidation(Staff), staffController.createStaff)

// 删除指定职员数据
staffRouter.delete('/:staffId', verifyAuth, staffController.deleteStaff)

// 修改指定职员数据
staffRouter.put('./:staffId', verifyAuth, usingValidation(Staff), staffController.updateStaff)

// 查找指定职员数据
staffRouter.get('/:staffId', verifyAuth, staffController.getStaffById)

// 获取职员数据列表
staffRouter.post('/list', verifyAuth, staffController.getStaffList)

export default staffRouter
