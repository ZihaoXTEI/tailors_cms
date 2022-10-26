import { Status, ClientType } from '../types/entityType'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  UpdateDateColumn
} from 'typeorm'
import Permission from './Permission'
import { IsEnum, IsOptional, IsPositive, IsString, Length, Max, Min } from 'class-validator'

@Entity('menu_tb')
@Tree('materialized-path')
export default class Menu {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    name: 'menu_name',
    type: 'varchar',
    length: 24,
    comment: '菜单名称'
  })
  @Length(2, 20, { message: '菜单名称不合法' })
  menuName!: string

  @Column({
    type: 'varchar',
    length: '64',
    nullable: true,
    unique: true,
    comment: '菜单路径'
  })
  @Length(4, 60, { message: '菜单路径不合法' })
  url!: string

  @Column({
    type: 'varchar',
    length: '32',
    nullable: true,
    comment: '菜单样式'
  })
  @IsOptional()
  @IsString()
  style: string | undefined

  @Column({
    name: 'view_name',
    type: 'varchar',
    length: '64',
    nullable: true,
    unique: true,
    comment: '页面文件名称'
  })
  @IsOptional()
  @IsString()
  viewName: string | undefined

  @Column({
    name: 'menu_type',
    type: 'enum',
    enum: ClientType,
    default: ClientType.CMS,
    comment: '菜单类型'
  })
  @IsEnum(ClientType)
  menuType!: ClientType

  @Column({
    name: 'menu_level',
    type: 'tinyint',
    comment: '菜单级别'
  })
  @Min(0, { message: '菜单级别不合法' })
  @Max(100, { message: '菜单级别不合法' })
  menuLevel!: number

  @Column({
    type: 'smallint',
    unique: true,
    comment: '菜单排序'
  })
  @Min(0, { message: '菜单排序不合法' })
  @Max(1000, { message: '菜单排序不合法' })
  sort!: number

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NORMAL,
    comment: '状态'
  })
  status!: Status

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

  @OneToMany(() => Permission, (permission) => permission.menu)
  permissionList!: Permission[]

  @Column({
    name: 'parent_id',
    type: 'number',
    nullable: true
  })
  @IsOptional()
  @IsPositive()
  parentId!: number

  @ManyToOne((type) => Menu, (menu) => menu.childMenuList)
  @JoinColumn({
    name: 'parent_id',
    referencedColumnName: 'id'
  })
  @TreeParent()
  parentMenu: Menu | undefined

  @OneToMany(() => Menu, (menu) => menu.parentMenu)
  @TreeChildren()
  childMenuList!: Menu[]
}
