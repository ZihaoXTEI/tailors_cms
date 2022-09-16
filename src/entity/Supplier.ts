import { Status } from '../types/entityType'
import { Column, Entity, OneToMany } from 'typeorm'
import BaseEntity from './BaseEntity'
import FabricInbound from './FabricInbound'
import { IsPhoneNumber, Length } from 'class-validator'

@Entity('supplier_tb')
export default class Supplier extends BaseEntity {
  @Column({
    name: 'supplier_name',
    type: 'varchar',
    length: 32,
    comment: '供应商名称'
  })
  @Length(2, 30, { message: '供应商名称不合法' })
  supplierName!: string

  @Column({
    name: ' supplier_address',
    type: 'varchar',
    length: 64,
    comment: '供应商地址'
  })
  @Length(6, 60, { message: '供应商地址不合法' })
  supplierAddress!: string

  @Column({
    name: 'supplier_phone',
    type: 'varchar',
    length: 14,
    nullable: true,
    unique: true,
    comment: '供应商联系电话'
  })
  @IsPhoneNumber('CH', { message: '供应商联系电话不合法' })
  supplierPhone: string | undefined

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NORMAL,
    comment: '供应商状态'
  })
  status!: Status

  @OneToMany(() => FabricInbound, (fabricInbound) => fabricInbound.supplier)
  fabricInboundList!: FabricInbound[]
}
