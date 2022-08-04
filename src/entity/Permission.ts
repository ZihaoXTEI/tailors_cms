import { Status } from '../types/entityType'
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from 'typeorm'
import BaseEntity from './BaseEntity'
import Menu from './Menu'
import Role from './Role'

@Entity('permission_tb')
export default class Permission extends BaseEntity {
  @Column({
    name: 'permission_name',
    type: 'varchar',
    length: 32,
    comment: '权限名称',
  })
  permissionName!: string

  @Column({
    name: 'permission_describe',
    type: 'varchar',
    length: 64,
    comment: '权限描述',
  })
  permissionDescribe: string | undefined

  @Column({
    name: 'permission_remark',
    type: 'varchar',
    length: 64,
    nullable: true,
    comment: '权限说明',
  })
  permissionRemark: string | undefined

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NORMAL,
    comment: '状态',
  })
  status!: Status

  @ManyToOne(() => Menu, (menu) => menu.permissionList)
  menu: Menu | undefined

  @ManyToMany(() => Role, (role) => role.permissionList)
  @JoinTable({
    name: 'role_permission_tb',
  })
  roleList: Role[] | undefined
}
