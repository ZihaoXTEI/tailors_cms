import Router from 'koa-router'

import userController from '../controller/user.controller'

const useRouter = new Router({ prefix: '/user' })

useRouter.post('/', userController.create)

useRouter.get('/', (ctx) => {
  ctx.body = '创建用户成功'
})

export default useRouter
