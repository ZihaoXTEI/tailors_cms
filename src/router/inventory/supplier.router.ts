import Router from '@koa/router'
import supplierController from '../../controller/inventory/supplier.controller'
import Supplier from '../../entity/Supplier'
import { verifyAuth } from '../../middleware/auth.middleware'
import { usingValidation } from '../../middleware/global/validation.middleware'

// 供应商信息路由
const supplierRouter = new Router({ prefix: '/inventory/supplier' })

// 添加供应商数据
supplierRouter.post('/', verifyAuth, usingValidation(Supplier), supplierController.createSupplier)

// 删除指定供应商数据
supplierRouter.delete('/:supplierId', verifyAuth, supplierController.deleteSupplier)

// 修改指定供应商数据
supplierRouter.put('/:supplierId', verifyAuth, usingValidation(Supplier), supplierController.updateSupplier)

// 查找指定供应商数据
supplierRouter.get('/:supplierId', supplierController.getSupplierById)

// 获取供应商数据列表
supplierRouter.post('/list', supplierController.getSupplierList)

export default supplierRouter
