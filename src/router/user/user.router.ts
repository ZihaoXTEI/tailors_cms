import Router from 'koa-router'

import userController from '../../controller/user/user.controller'
import { verifyAuth } from '../../middleware/auth.middleware'
import { verifyUser, handlePassword } from '../../middleware/user.middleware'

const userRouter = new Router({ prefix: '/user' })

// 创建用户数据
userRouter.post('/:clientType', verifyUser, handlePassword, userController.createUser)

// 删除指定用户数据
userRouter.delete('/:userId', verifyAuth, userController.deleteUser)

// 修改指定用户数据
userRouter.put('./:userId', verifyAuth, userController.updateUser)

userRouter.get('/:userId', verifyAuth, userController.getUserById)

export default userRouter
