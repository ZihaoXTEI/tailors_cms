import Router from '@koa/router'
import authController from '../controller/auth.controller'
import { verifyAuth, verifyLogin, setTokenToHeader } from '../middleware/auth.middleware'

const authRouter = new Router()

authRouter.post('/login', verifyLogin, authController.login)

authRouter.post('/auth', setTokenToHeader, verifyAuth, authController.login)

export default authRouter
