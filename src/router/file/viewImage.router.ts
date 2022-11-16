import Router from '@koa/router'
import ViewImageController from '../../controller/file/viewImage.controller'

const viewImageRouter = new Router({ prefix: '/image' })
const viewImageController = new ViewImageController()

viewImageRouter.get('/fabric/:fileName', viewImageController.viewFabricImage)
viewImageRouter.get('/carousel/:fileName', viewImageController.viewCarouselImage)

export default viewImageRouter
