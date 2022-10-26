/* eslint-disable @typescript-eslint/no-unused-vars */
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import database from './database'

import cors from '@koa/cors'

import { useRoutes } from '../router'
import { errorHandler } from './errorHandler'

database.then(() => {
  console.log('MySQL连接成功')
})

const app = new Koa()

app.use(cors())
app.use(bodyParser())
useRoutes(app)
app.on('error', errorHandler)

export { app }
