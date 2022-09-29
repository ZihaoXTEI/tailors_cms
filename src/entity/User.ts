import {
  Entity,
  Column,
  ManyToMany,
  OneToOne,
  UpdateDateColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn
} from 'typeorm'
// import BaseEntity from './BaseEntity'

import { Status } from '../types/entityType'
import Role from './Role'
import Customer from './Customer'
import Staff from './Staff'
import { Length } from 'class-validator'

@Entity('user_tb')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @CreateDateColumn({
    name: 'create_at'
  })
  createAt!: Date

  @UpdateDateColumn({
    name: 'update_at'
  })
  updateAt!: Date

  @Column({
    type: 'varchar',
    length: 24,
    unique: true,
    comment: '用户昵称'
  })
  @Length(4, 24, { message: '用户昵称不合法' })
  nickname!: string

  @Column({
    type: 'varchar',
    length: 128,
    comment: '用户密码'
  })
  @Length(6, 24, { message: '用户密码不合法' })
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
