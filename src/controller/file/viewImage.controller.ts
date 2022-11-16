import { createReadStream } from 'fs'
import { Context } from 'koa'
import { FABRIC_IMAGE_PATH, CAROUSEL_IMAGE_PATH } from '../../constant/filePath'

class ViewImageController {
  private types = ['small', 'middle', 'large']

  async viewFabricImage(ctx: Context) {
    let { fileName } = ctx.params

    // const fileInfo = await fileService.getFileByFilename(filename);
    const { type } = ctx.query

    if (this.types.some((item) => item === type)) {
      fileName = `${fileName}`
    }

    ctx.response.set('content-type', 'image/jpeg')
    ctx.body = createReadStream(`${FABRIC_IMAGE_PATH}/${fileName}`)
  }

  async viewCarouselImage(ctx: Context) {
    let { fileName } = ctx.params

    const { type } = ctx.query
    if (this.types.some((item) => item === type)) {
      fileName = `${fileName}-${type}`
    }

    ctx.response.set('content-type', 'image/jpeg')
    ctx.body = createReadStream(`${CAROUSEL_IMAGE_PATH}/${fileName}`)
  }
}

export default ViewImageController
