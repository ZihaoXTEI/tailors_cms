/* eslint-disable @typescript-eslint/no-unused-vars */
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import database from './database'

import useRouter from '../router/user.router'

const app = new Koa()

app.use(bodyParser())

app.use(useRouter.routes())
app.use(useRouter.allowedMethods())

const mysql = database.then(() => {
  console.log('MySQL连接成功')
})

export { app }
