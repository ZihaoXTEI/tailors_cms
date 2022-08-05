import Router from 'koa-router'

import userController from '../controller/user.controller'
import { verifyUser, handlePassword } from '../middleware/user.middleware'

const useRouter = new Router({ prefix: '/user' })

useRouter.post('/', verifyUser, handlePassword, userController.createUser)

useRouter.get('/', (ctx) => {
  ctx.body = '创建用户成功'
})

export default useRouter
