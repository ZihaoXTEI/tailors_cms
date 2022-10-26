import { Status } from '../types/entityType'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn
} from 'typeorm'
import Menu from './Menu'
import Role from './Role'
import { IsOptional, IsPositive, Length } from 'class-validator'

@Entity('permission_tb')
@Tree('materialized-path')
export default class Permission {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    name: 'permission_name',
    type: 'varchar',
    length: 32,
    comment: '权限名称'
  })
  @Length(2, 30, { message: '权限名称不合法' })
  permissionName!: string

  @Column({
    name: 'permission_describe',
    type: 'varchar',
    length: 64,
    comment: '权限描述'
  })
  @Length(5, 60, { message: '权限描述不合法' })
  permissionDescribe: string | undefined

  @Column({
    name: 'permission_remark',
    type: 'varchar',
    length: 64,
    nullable: true,
    comment: '权限说明'
  })
  @IsOptional()
  @Length(5, 60, { message: '权限说明不合法' })
  permissionRemark: string | undefined

  @Column({
    name: 'parent_id',
    type: 'int',
    nullable: true
  })
  @IsOptional()
  @IsPositive()
  parentId!: number

  @ManyToOne((type) => Permission, (permission) => permission.childPermissionList)
  @JoinColumn({
    name: 'parent_id',
    referencedColumnName: 'id'
  })
  @TreeParent()
  parentPermission: Permission | undefined

  @OneToMany(() => Permission, (permission) => permission.parentPermission)
  @TreeChildren()
  childPermissionList!: Permission[]

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NORMAL,
    comment: '状态'
  })
  status!: Status

  @Column({
    name: 'menu_id',
    type: 'int'
  })
  @IsOptional()
  @IsPositive()
  menuId!: number

  @ManyToOne(() => Menu, (menu) => menu.permissionList)
  @JoinColumn({
    name: 'menu_id',
    referencedColumnName: 'id'
  })
  menu: Menu | undefined

  @CreateDateColumn({
    name: 'create_at',
    comment: '创建时间'
  })
  createAt!: Date

  @UpdateDateColumn({
    name: 'update_at',
    comment: '更新时间'
  })
  updateAt!: Date

  @ManyToMany(() => Role, (role) => role.permissionList)
  @JoinTable({
    name: 'role_permission_tb',
    joinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_permission_role_tb_permission_id'
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_permission_role_tb_roler_id'
    }
  })
  roleList!: Role[]
}
