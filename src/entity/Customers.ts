import { Column, Entity } from 'typeorm'
import BaseEntity from './BaseEntity'

import { Gender, Status } from '../types/entityType'

@Entity('customer_tb')
export default class Customer extends BaseEntity {
  @Column({
    name: 'customer_name',
    type: 'varchar',
    length: 16,
    nullable: false,
    comment: '顾客姓名',
  })
  customerName!: String

  @Column({
    name: 'customer_gender',
    type: 'enum',
    enum: Gender,
    nullable: false,
    comment: '顾客性别',
  })
  customerGender!: Gender

  @Column({
    name: 'customer_phone',
    type: 'varchar',
    length: 11,
    nullable: true,
    comment: '顾客联系电话',
  })
  customerPhone!: string

  @Column({
    name: 'customer_address',
    type: 'varchar',
    length: 64,
    nullable: true,
    comment: '顾客住址',
  })
  customerAddress!: string

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NORMAL,
    comment: '顾客账号状态',
  })
  status!: Status
}
