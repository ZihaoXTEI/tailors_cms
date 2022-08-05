// import userService from '@/service/user.service'
import { Context, Next } from 'koa'
import { md5Password } from '../utils/encryption'

// 验证用户名和密码信息合法
const verifyUser = async (ctx: Context, next: Next) => {
  const { username, password } = ctx.request.body

  // 判断用户名和密码是否为空
  if (!username || !password) {
    console.log('用户名或密码为空')
    return ctx.app.emit('error', '用户名或密码为空', ctx)
  }

  // 判断用户名是否已经注册

  await next()
}

// 对密码进行MD5加密
const handlePassword = async (ctx: Context, next: Next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = await md5Password(password)

  await next()
}

export { verifyUser, handlePassword }
