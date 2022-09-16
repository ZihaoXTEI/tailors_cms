import { Context } from 'koa'
import ErrorObject from 'src/utils/errorObject'
import ErrorType from '../constant/errorType'

export const errorHandler = (error: ErrorObject, ctx: Context) => {
  let status = 400
  const errType = error.status

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
    case ErrorType.INTERNAL_SERVER_ERROR:
      status = 500
      break
    default:
      break
  }

  ctx.status = status
  ctx.body = {
    status,
    statusText: error.status,
    message: error.errMsg,
    errorData: error?.errData
  }
}
