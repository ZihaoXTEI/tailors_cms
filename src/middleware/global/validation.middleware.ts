import { validate } from 'class-validator'
import { Context, Next } from 'koa'
import { EntityTarget, ObjectLiteral } from 'typeorm'

import { AppDataSource } from '../../app/database'
import ErrorObject from '../../utils/errorObject'
import ErrorType from '../../constant/errorType'

const usingValidation = (entityClass: EntityTarget<ObjectLiteral>) => {
  return async (ctx: Context, next: Next) => {
    const { body } = ctx.request
    const repository = AppDataSource.getRepository(entityClass)
    const entity = repository.create(body)

    const errors = await validate(entity, { validationError: { target: false } })

    console.log(errors)

    if (errors.length > 0) {
      const errorData = errors.map((item) => {
        return Object.values(item.constraints as Object)[0] as string
      })

      const error = new ErrorObject('表单内容不合法', ErrorType.BAD_REQUEST, errorData)
      return ctx.app.emit('error', error, ctx)
    } else {
      await next()
    }
  }
}

export { usingValidation }
