import { validate } from 'class-validator'
import { Context, Next } from 'koa'
import { AppDataSource } from '../../app/database'
import ErrorObject from '../../utils/errorObject'
import ErrorType from '../../constant/errorType'
import { EntityTarget, ObjectLiteral } from 'typeorm'

const usingValidation = (entityClass: EntityTarget<ObjectLiteral>) => {
  return async (ctx: Context, next: Next) => {
    const { body } = ctx.request
    const repository = AppDataSource.getRepository(entityClass)
    const entity = repository.create(body)

    const errors = await validate(entity)

    if (errors.length > 0) {
      const error = new ErrorObject('Validation failed!', ErrorType.BAD_REQUEST)
      return ctx.app.emit('error', error, ctx)
    } else {
      await next()
    }
  }
}
