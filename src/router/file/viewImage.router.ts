import Router from '@koa/router'
import ViewImageController from '../../controller/file/viewImage.controller'

const viewImageRouter = new Router({ prefix: '/image' })
const viewImageController = new ViewImageController()

viewImageRouter.get('/fabric/:fileName', viewImageController.viewFabricImage)

export default viewImageRouter
