import { Context } from 'koa'
import ErrorType from '../../constant/errorType'
import SuccessType from '../../constant/successType'
import FabricTypeService from '../../service/data/fabricType.service'
import FabricService from '../../service/inventory/fabric.service'
import SupplierService from '../../service/inventory/supplier.service'
import MenuService from '../../service/system/menu.service'
import PermissionService from '../../service/system/permission.service'
import RoleService from '../../service/system/role.service'
import CustomerService from '../../service/user/customer.service'
import StaffService from '../../service/user/staff.service'
import ErrorObject from '../../utils/errorObject'
import SuccessObject from '../../utils/successObject'

class OptionController {
  private fabricTypeService = new FabricTypeService()
  private fabricService = new FabricService()
  private supplierService = new SupplierService()
  private staffService = new StaffService()
  private customerService = new CustomerService()
  private menuService = new MenuService()
  private roleService = new RoleService()
  private permissionService = new PermissionService()

  getFabricTypeOption = async (ctx: Context) => {
    try {
      const optionList = await this.fabricTypeService.getFabricTypeOption()
      const data = new SuccessObject(SuccessType.OK, `获取数据成功`, optionList)
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`获取数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getFabricOption = async (ctx: Context) => {
    try {
      const optionList = await this.fabricService.getFabricOption()
      const data = new SuccessObject(SuccessType.OK, `获取数据成功`, optionList)
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`获取数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getSupplierOption = async (ctx: Context) => {
    try {
      const optionList = await this.supplierService.getSupplierOption()
      const data = new SuccessObject(SuccessType.OK, `获取数据成功`, optionList)
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`获取数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getStaffOption = async (ctx: Context) => {
    try {
      const optionList = await this.staffService.getStaffOption()
      const data = new SuccessObject(SuccessType.OK, `获取数据成功`, optionList)
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`获取数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getCustomerOption = async (ctx: Context) => {
    try {
      const optionList = await this.customerService.getCustomerOption()
      const data = new SuccessObject(SuccessType.OK, `获取数据成功`, optionList)
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`获取数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getMenuOption = async (ctx: Context) => {
    try {
      const optionList = await this.menuService.getMenuOption()
      const data = new SuccessObject(SuccessType.OK, `获取数据成功`, optionList)
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`获取数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getRoleOption = async (ctx: Context) => {
    try {
      const optionList = await this.roleService.getRoleOption()
      const data = new SuccessObject(SuccessType.OK, `获取数据成功`, optionList)
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`获取数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }

  getPermisionOption = async (ctx: Context) => {
    try {
      const optionList = await this.permissionService.getPermissionOption()
      const data = new SuccessObject(SuccessType.OK, `获取数据成功`, optionList)
      ctx.body = data
    } catch (err) {
      console.log(err)
      const error = new ErrorObject(`获取数据错误`, ErrorType.INTERNAL_SERVER_ERROR)
      return ctx.app.emit('error', error, ctx)
    }
  }
}

export default OptionController
