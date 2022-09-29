import { Context, Next } from 'koa'
import jwt from 'jsonwebtoken'
import userService from '../service/user/user.service'
import { PUBLIC_KEY } from '../app/config'
import ErrorType from '../constant/errorType'
import { md5Password } from '../utils/encryption'
import ErrorObject from '../utils/errorObject'

const verifyLogin = async (ctx: Context, next: Next) => {
  const { nickname, password } = ctx.request.body

  // 判断用户名和密码是否为空
  if (!nickname || !password) {
    console.log('用户名或密码为空')
    // const error = new Error('用户名或密码为空')
    const error = new ErrorObject('用户名或密码为空', ErrorType.BAD_REQUEST)

    return ctx.app.emit('error', error, ctx)
  }

  // 判断用户是否存在
  let result = null
  try {
    result = await userService.getUserByName(nickname)
    console.log(result)
  } catch (err) {
    console.log(err)
  }
  if (!result) {
    // const error = new Error('不存在该用户')
    const error = new ErrorObject('不存在该用户', ErrorType.BAD_REQUEST)

    return ctx.app.emit('error', error, ctx)
  }

  // 判断用户密码是否正确
  const encryPassword = await md5Password(password)
  if (encryPassword !== result.password) {
    // const error = new Error('密码错误')
    const error = new ErrorObject('密码错误', ErrorType.BAD_REQUEST)

    return ctx.app.emit('error', error, ctx)
  }

  ctx.user = result

  await next()
}

// 验证是否登录
const verifyAuth = async (ctx: Context, next: Next) => {
  // 获取 token
  const authorization = ctx.header.authorization

  // console.log('auth', authorization)
  if (!authorization) {
    // 没有token
    // const error = new Error('无效 token')
    const error = new ErrorObject('无效 token', ErrorType.BAD_REQUEST)

    return ctx.app.emit('error', error, ctx)
  }

  const token = authorization.replace('Bearer ', '')

  // 验证 token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256']
    })

    ctx.user = result
    await next()
  } catch {
    const error = new ErrorObject('无效 token', ErrorType.BAD_REQUEST)

    ctx.app.emit('error', error, ctx)
  }
}

// 验证权限
const verifyPermission = async (ctx: Context, next: Next) => {
  await next()
}

const setTokenToHeader = async (ctx: Context, next: Next) => {
  const { token = '' } = ctx.request.body
  console.log(ctx.request.body)
  ctx.header.authorization = token
  await next()
}

export { verifyLogin, verifyAuth, setTokenToHeader, verifyPermission }
