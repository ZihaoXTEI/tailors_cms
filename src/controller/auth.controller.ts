import jwt from 'jsonwebtoken'
import { Context } from 'koa'
import { PRIVATE_KEY } from '../app/config'
import SuccessType from '../constant/successType'
import SuccessObject from '../utils/successObject'

class AuthController {
  login(ctx: Context) {
    const { id, nickname } = ctx.user

    const token = jwt.sign({ id, nickname }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24, // 单位：秒
      algorithm: 'RS256'
    })

    // console.log(token)

    const data = new SuccessObject(SuccessType.OK, '登录成功', { userId: id, token })
    ctx.body = data
  }

  success(ctx: Context) {
    console.log(ctx.user)
    ctx.body = ctx.user
  }
}

export default new AuthController()
