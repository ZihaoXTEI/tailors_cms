import Koa from 'koa'
import userRouter from './user.router'
import authRouter from './auth.router'

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
}
