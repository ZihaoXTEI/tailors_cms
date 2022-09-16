import Router from 'koa-router'

import userController from '../../controller/user/user.controller'
import { verifyAuth } from '../../middleware/auth.middleware'
import { verifyUser, handlePassword } from '../../middleware/user.middleware'

const useRouter = new Router({ prefix: '/user' })

// 创建用户数据
useRouter.post('/', verifyUser, handlePassword, userController.createUser)

useRouter.get('/:userId', verifyAuth, userController.getUserInfo)

export default useRouter
