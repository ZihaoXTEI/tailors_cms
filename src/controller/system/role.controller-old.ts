import RoleService from '../../service/system/role.service'
import SystemController from './system.contoller'

class RoleController extends SystemController {
  constructor() {
    super(new RoleService(), '角色')
  }
}

export default RoleController
