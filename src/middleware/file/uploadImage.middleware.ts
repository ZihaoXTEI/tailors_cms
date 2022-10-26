import path from 'path'

import { FABRIC_IMAGE_PATH } from '../../constant/filePath'

import multer from '@koa/multer'

const storage = (filePath: string) => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, filePath)
    },
    filename: (req, file, cb) => {
      console.log(path.extname(file.originalname))
      const uniqueSuffix = `${Date.now()}${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
      cb(null, uniqueSuffix)
    }
  })
}

const fabricImageUpload = multer({
  storage: storage(FABRIC_IMAGE_PATH),
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) return cb(null, true)
    else cb(null, false)
  }
})
const fabricImageHandler = fabricImageUpload.array('image', 6)

export { fabricImageHandler }
