import { Status } from '@/types/entityType'
import { Column, Entity } from 'typeorm'
import BaseEntity from './BaseEntity'

@Entity('supplier_tb')
export default class Supplier extends BaseEntity {
  @Column({
    name: 'supplier_name',
    type: 'varchar',
    length: 32,
    comment: '供应商名称',
  })
  supplierName!: string

  @Column({
    name: ' supplier_address',
    type: 'varchar',
    length: 64,
    comment: '供应商地址',
  })
  supplierAddress!: string

  @Column({
    name: 'supplier_phone',
    type: 'varchar',
    length: 11,
    nullable: true,
    unique: true,
    comment: '供应商联系电话',
  })
  supplierPhone: string | undefined

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NORMAL,
    comment: '供应商状态',
  })
  status!: Status
}
