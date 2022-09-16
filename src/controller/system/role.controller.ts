import { Context } from 'koa'
import ErrorType from '../../constant/errorType'
import SuccessType from '../../constant/successType'
import RoleService from '../../service/system/role.service'
import ErrorObject from '../../utils/errorObject'
import SuccessObject from '../../utils/successObject'
import SystemController from './system.contoller'

class RoleController extends SystemController {
  constructor() {
    super(new RoleService(), '角色')
  }
}

export default new RoleController()
