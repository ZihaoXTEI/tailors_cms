import { Entity, Column, ManyToMany, OneToOne } from 'typeorm'
import BaseEntity from './BaseEntity'

import { Status } from '../types/entityType'
import Role from './Role'
import Customer from './Customer'
import Staff from './Staff'

@Entity('user_tb')
export default class User extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 24,
    unique: true,
    comment: '用户昵称'
  })
  nickname!: string

  @Column({
    type: 'varchar',
    length: 128,
    comment: '用户密码'
  })
  password!: string

  @Column({
    type: 'varchar',
    length: 128,
    nullable: true,
    comment: '用户头像'
  })
  avatar: string | undefined

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NORMAL,
    comment: '账号状态'
  })
  status!: Status

  @ManyToMany(() => Role, (role) => role.userList)
  roleList!: Role[]

  @OneToOne(() => Customer, (customer) => customer.user)
  customer!: Customer

  @OneToOne(() => Staff, (staff) => staff.user)
  staff!: Staff
}
