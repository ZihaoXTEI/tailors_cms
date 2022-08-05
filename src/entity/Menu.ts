import { Status, MenuType } from '../types/entityType'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import BaseEntity from './BaseEntity'
import Permission from './Permission'

@Entity('menu_tb')
export default class Menu extends BaseEntity {
  @Column({
    name: 'menu_name',
    type: 'varchar',
    length: 24,
    comment: '菜单名称'
  })
  menuName!: string

  @Column({
    type: 'varchar',
    length: '64',
    comment: '菜单路径'
  })
  url!: string

  @Column({
    type: 'varchar',
    length: '16',
    nullable: true,
    comment: '菜单样式'
  })
  style: string | undefined

  @Column({
    name: 'menu_type',
    type: 'enum',
    enum: MenuType,
    default: MenuType.CMS,
    comment: '菜单类型'
  })
  menuType!: MenuType

  @Column({
    name: 'menu_level',
    type: 'tinyint',
    comment: '菜单级别'
  })
  menuLevel!: number

  @Column({
    type: 'smallint',
    comment: '菜单排序'
  })
  sort!: number

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NORMAL,
    comment: '状态'
  })
  status!: Status

  @OneToMany(() => Permission, (permission) => permission.menu)
  permissionList!: Permission[]

  // parent_id
  @ManyToOne((type) => Menu, (menu) => menu.childMenuList)
  @JoinColumn({
    name: 'parent_id',
    referencedColumnName: 'id'
  })
  parentMenu: Menu | undefined

  @OneToMany(() => Menu, (menu) => menu.parentMenu)
  childMenuList!: Menu[]
}
