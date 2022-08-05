import { Context } from 'koa'
import ErrorType from '../constant/errotType'

export const errorHandler = (error: Error, errType: string, ctx: Context) => {
  let status = 400

  switch (errType) {
    case ErrorType.BAD_REQUEST:
      status = 400
      break
    case ErrorType.FORBIDDEN:
      status = 403
      break
    case ErrorType.UNAUTHORIZED:
      status = 401
      break
    default:
      break
  }

  ctx.status = status
  ctx.body = {
    status: status,
    message: error.message
  }
}
