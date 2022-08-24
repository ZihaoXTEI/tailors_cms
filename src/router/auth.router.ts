import Router from 'koa-router'
import authController from '../controller/auth.controller'
import { verifyAuth, verifyLogin } from '../middleware/auth.middleware'

const authRouter = new Router()

authRouter.post('/login', verifyLogin, authController.login)

authRouter.get('/testauth', verifyAuth, authController.success)

export default authRouter
