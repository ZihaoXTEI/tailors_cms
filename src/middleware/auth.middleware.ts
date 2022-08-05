import { Context, Next } from 'koa'
import userService from '../service/user.service'
import ErrorType from '../constant/errotType'

const verifyLogin = async (ctx: Context, next: Next) => {
  const { username, password } = ctx.request.body

  // 判断用户名和密码是否为空
  if (!username || !password) {
    const error = new Error('用户名或密码为空')
    return ctx.app.emit('error', error, ErrorType.BAD_REQUEST, ctx)
  }

  // 判断用户是否存在
  const result = await userService.getUserByName(username)
  console.log(result)
  ctx.body = result

  await next()
}

export { verifyLogin }
