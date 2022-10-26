import Router from '@koa/router'
import AnthroMeasureController from '../../controller/user/anthroMeasure.controller'
import AnthroMeasure from '../../entity/AnthroMeasure'
import { verifyAuth } from '../../middleware/auth.middleware'
import { usingValidation } from '../../middleware/global/validation.middleware'

// 人体测量信息路由
const anthroMeasureRouter = new Router({ prefix: '/user/anthromeasure' })
const anthroMeasureController = new AnthroMeasureController()

// 添加人体测量数据
anthroMeasureRouter.post('/', verifyAuth, usingValidation(AnthroMeasure), anthroMeasureController.createAnthroMeasure)

// 删除指定人体测量数据
anthroMeasureRouter.delete('/:anthroMeasureId', verifyAuth, anthroMeasureController.deleteAnthroMeasure)

// 修改指定人体测量数据
anthroMeasureRouter.put(
  './:anthroMeasureId',
  verifyAuth,
  usingValidation(AnthroMeasure),
  anthroMeasureController.updateAnthroMeasure
)

// 查找指定人体测量数据（根据 anthroMeasureId）
anthroMeasureRouter.get('/:anthroMeasureId', verifyAuth, anthroMeasureController.getAnthroMeasureById)

// 获取人体测量数据列表
anthroMeasureRouter.post('/list', verifyAuth, anthroMeasureController.getAnthroMeasureList)

export default anthroMeasureRouter
