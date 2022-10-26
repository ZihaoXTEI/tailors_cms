import Router from '@koa/router'
import UploadImageController from '../../controller/file/uploadImage.controller'
import { verifyAuth } from '../../middleware/auth.middleware'
import { fabricImageHandler } from '../../middleware/file/uploadImage.middleware'

const uploadImageRouter = new Router({ prefix: '/upload' })
const uploadImageController = new UploadImageController()

uploadImageRouter.post('/fabric', verifyAuth, fabricImageHandler, uploadImageController.savaFabricImage)

uploadImageRouter.delete('/delete/:imageName', verifyAuth, uploadImageController.removeImage)

export default uploadImageRouter
