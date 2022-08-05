import { Context } from 'koa'
import userService from '../service/user.service'
import User from '../entity/User'

class UserController {
  // 创建用户
  async createUser(ctx: Context) {
    const req = ctx.request.body
    console.log(req)

    const user = new User()
    user.nickname = req.username
    user.password = req.password

    const res = await userService.createUser(user)
    // 需要同时为该角色赋予角色

    // 根据角色创建 顾客表/员工表

    // res结果：
    /*     {
      "id": "b50fd172-4023-479e-96fe-18e3388324f5",
      "createAt": "2022-08-05T07:10:57.870Z",
      "updateAt": "2022-08-05T07:10:57.870Z",
      "nickname": "cikao",
      "password": "abc123",
      "avatar": null,
      "status": 1
  } */

    ctx.body = res
  }
}

export default new UserController()
