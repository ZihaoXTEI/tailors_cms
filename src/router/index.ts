import Koa from 'koa'
import userRouter from './user/user.router'
import authRouter from './auth.router'
import clothTypeRouter from './data/clothType.router'
import fabricTypeRouter from './data/fabricType.router'
import clothTypeConsumptionRouter from './data/clothTypeConsumption.router'
import fabricRouter from './inventory/fabric.router'
import supplierRouter from './inventory/supplier.router'
import fabricInboundRouter from './inventory/fabricInbound.router'

import menuRouter from './system/menu.route'
import roleRouter from './system/role.router'
import permissionRouter from './system/permission.router'

// export const useRoutes = (app: Koa) => {
//   fs.readdirSync(__dirname).forEach(async (file) => {
//     if (file === 'index.ts') return
//     console.log(file)
//     // const router = require(`./${file}`)
//     const router = await import(`./${file}`)
//     console.log(router)
//     app.use(router.routes())
//     app.use(router.allowedMethods())
//   })
// }

export const useRoutes = (app: Koa) => {
  app.use(userRouter.routes())
  app.use(userRouter.allowedMethods())
  app.use(authRouter.routes())
  app.use(authRouter.allowedMethods())

  app.use(clothTypeRouter.routes())
  app.use(clothTypeRouter.allowedMethods())
  app.use(fabricTypeRouter.routes())
  app.use(fabricTypeRouter.allowedMethods())
  app.use(clothTypeConsumptionRouter.routes())
  app.use(clothTypeConsumptionRouter.allowedMethods())

  app.use(fabricRouter.routes())
  app.use(fabricRouter.allowedMethods())
  app.use(supplierRouter.routes())
  app.use(supplierRouter.allowedMethods())
  app.use(fabricInboundRouter.routes())
  app.use(fabricInboundRouter.allowedMethods())

  app.use(menuRouter.routes())
  app.use(menuRouter.allowedMethods())
  app.use(roleRouter.routes())
  app.use(roleRouter.allowedMethods())
  app.use(permissionRouter.routes())
  app.use(permissionRouter.allowedMethods())
}
