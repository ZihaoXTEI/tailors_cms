import { createReadStream } from 'fs'
import { Context } from 'koa'
import { FABRIC_IMAGE_PATH } from '../../constant/filePath'

class ViewImageController {
  async viewFabricImage(ctx: Context) {
    let { fileName } = ctx.params

    // const fileInfo = await fileService.getFileByFilename(filename);
    const { type } = ctx.query
    const types = ['small', 'middle', 'large']
    if (types.some((item) => item === type)) {
      fileName = `${fileName}`
    }

    ctx.response.set('content-type', 'image/jpeg')
    ctx.body = createReadStream(`${FABRIC_IMAGE_PATH}/${fileName}`)
  }
}

export default ViewImageController
