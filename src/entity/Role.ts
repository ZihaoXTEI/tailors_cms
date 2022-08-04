import { Status } from '../types/entityType'
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm'
import BaseEntity from './BaseEntity'
import Permission from './Permission'
import User from './User'

@Entity('role_tb')
export default class Role extends BaseEntity {
  @Column({
    name: 'role_name',
    type: 'varchar',
    length: 24,
    nullable: false,
    comment: '角色名称',
  })
  roleName!: string

  @Column({
    name: 'role_remark',
    type: 'varchar',
    length: 64,
    nullable: true,
    comment: '角色说明',
  })
  roleRemark: string | undefined

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NORMAL,
    comment: '状态',
  })
  status!: Status

  @ManyToMany(() => User, (user) => user.roleList)
  @JoinTable({
    name: 'user_role_tb',
  })
  userList: User[] | undefined

  @ManyToMany(() => Permission, (permission) => permission.roleList)
  permissionList: Permission[] | undefined
}
