// import userService from '@/service/user.service'
import { Context, Next } from 'koa'
import ErrorType from '../constant/errorType'
import ErrorObject from '../utils/errorObject'
import { md5Password } from '../utils/encryption'
import userService from '../service/user/user.service'

// 验证用户名和密码信息合法
const verifyUser = async (ctx: Context, next: Next) => {
  const { nickname, password } = ctx.request.body

  // 判断用户名和密码是否为空
  if (!nickname || !password) {
    const error = new ErrorObject('用户名或密码为空', ErrorType.BAD_REQUEST)

    return ctx.app.emit('error', error, ctx)
  }

  // 判断用户名是否已经注册
  const result = await userService.getUserByName(nickname)
  if (result) {
    const error = new ErrorObject('用户名已存在', ErrorType.BAD_REQUEST)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

// 对密码进行 MD5 加密
const handlePassword = async (ctx: Context, next: Next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = await md5Password(password)

  await next()
}

export { verifyUser, handlePassword }
