import path from 'path'
import { rm } from 'node:fs/promises'

import { Context } from 'koa'
import ErrorType from '../../constant/errorType'
import SuccessType from '../../constant/successType'
import ErrorObject from '../../utils/errorObject'
import SuccessObject from '../../utils/successObject'
import { FABRIC_IMAGE_PATH } from '../../constant/filePath'
import FabricImageService from '../../service/file/fabricImage.service'

class UploadImageController {
  private fabricImageService = new FabricImageService()
  async savaFabricImage(ctx: Context) {
    const { files } = ctx

    if (files && Array.isArray(files) && files.length > 0) {
      const result = files.map((item) => {
        const url = `http://localhost:9000/image/fabric/${item.filename}`
        return { imageName: item.filename, mimetype: item.mimetype, size: item.size, url }
      })

      console.log(result)

      const data = new SuccessObject(SuccessType.OK, '上传布料图片成功', {
        list: result,
        total: files.length
      })
      ctx.body = data
    } else {
      const error = new ErrorObject('上传布料图片错误', ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  removeImage = async (ctx: Context) => {
    const { imageName } = ctx.params
    const { fabricId }: { fabricId?: string } = ctx.query

    console.log(imageName, fabricId)

    try {
      await rm(path.resolve(process.cwd(), `${FABRIC_IMAGE_PATH}/${imageName}`), { force: true })

      if (fabricId) {
        // 删除数据库记录
        await this.fabricImageService.deleteFabricImage(fabricId, imageName)
      }

      const data = new SuccessObject(SuccessType.OK, '删除布料图片成功')
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject('删除布料图片错误', ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }
}

export default UploadImageController
