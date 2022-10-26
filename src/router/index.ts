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
import { roleRouter, userRoleRouter } from './system/role.router'
import { permissionRouter, rolePermissionRouter } from './system/permission.router'

import staffRouter from './user/staff.router'
import customerRouter from './user/customer.router'
import uploadImageRouter from './file/uploadImage.router'
import viewImageRouter from './file/viewImage.router'
import optionRouter from './view/option.router'
import fabricInventoryRouter from './inventory/fabricInventory.router'
import customerFavoriteRouter from './user/customerFavorite.router'
import anthroMeasureRouter from './user/anthroMeasure.router'

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
  app.use(fabricInventoryRouter.routes())
  app.use(fabricInventoryRouter.allowedMethods())

  app.use(menuRouter.routes())
  app.use(menuRouter.allowedMethods())
  app.use(roleRouter.routes())
  app.use(roleRouter.allowedMethods())
  app.use(userRoleRouter.routes())
  app.use(userRoleRouter.allowedMethods())
  app.use(permissionRouter.routes())
  app.use(permissionRouter.allowedMethods())
  app.use(rolePermissionRouter.routes())
  app.use(rolePermissionRouter.allowedMethods())

  app.use(staffRouter.routes())
  app.use(staffRouter.allowedMethods())
  app.use(customerRouter.routes())
  app.use(customerRouter.allowedMethods())
  app.use(customerFavoriteRouter.routes())
  app.use(customerFavoriteRouter.allowedMethods())
  app.use(anthroMeasureRouter.routes())
  app.use(anthroMeasureRouter.allowedMethods())

  app.use(uploadImageRouter.routes())
  app.use(uploadImageRouter.allowedMethods())
  app.use(viewImageRouter.routes())
  app.use(viewImageRouter.allowedMethods())

  app.use(optionRouter.routes())
  app.use(optionRouter.allowedMethods())
}
