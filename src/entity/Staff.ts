import { Gender, Status } from '../types/entityType'
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm'
import BaseEntity from './BaseEntity'
import FabricInbound from './FabricInbound'
import User from './User'

@Entity('staff_tb')
export default class Staff extends BaseEntity {
  @Column({
    name: 'staff_name',
    type: 'varchar',
    length: 16,
    comment: '员工姓名'
  })
  staffName!: string

  @Column({
    name: 'staff_gender',
    type: 'enum',
    enum: Gender,
    default: Gender.MALE,
    comment: '员工性别'
  })
  staffGender!: Gender

  @Column({
    name: 'staff_salary',
    type: 'double',
    comment: '员工每月工资'
  })
  staffSalary!: number

  @Column({
    name: 'staff_entrydate',
    type: 'date',
    comment: '员工入职时间'
  })
  staffEntrydate!: Date

  @Column({
    name: 'staff_phone',
    type: 'varchar',
    length: 11,
    comment: '员工联系电话'
  })
  staffPhone!: string

  @Column({
    name: 'staff_address',
    type: 'varchar',
    length: 64,
    comment: '员工住址'
  })
  staffAddress!: string

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NORMAL,
    comment: '员工账号状态'
  })
  status!: Status

  @OneToOne(() => User, (user) => user.staff)
  @JoinColumn({
    name: 'user_id'
  })
  user!: User

  @OneToMany(() => FabricInbound, (fabricInbound) => fabricInbound.staff)
  fabricInboundList!: FabricInbound[]
}
