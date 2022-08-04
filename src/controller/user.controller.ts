import { Context } from 'koa'

class UserController {
  async create(ctx: Context) {
    const user = ctx.request.body
    console.log(user)
    ctx.body = 'user info'
  }
}

export default new UserController()
