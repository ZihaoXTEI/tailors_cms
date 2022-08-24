import jwt from 'jsonwebtoken'
import { Context } from 'koa'
import { PRIVATE_KEY } from '../app/config'

class AuthController {
  login(ctx: Context) {
    const { id, nickname } = ctx.user

    const token = jwt.sign({ id, nickname }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24, // 单位：秒
      algorithm: 'RS256'
    })

    console.log(token)

    ctx.body = { token }
  }

  success(ctx: Context) {
    ctx.body = ctx.user
  }
}

export default new AuthController()
