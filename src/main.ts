import { app } from './app'

import 'reflect-metadata'

import { APP_PORT } from './app/config'

app.listen(APP_PORT, () => {
  console.log(`服务器启动成功：端口号：${APP_PORT}`)
})
