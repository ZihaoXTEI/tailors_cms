import { Status } from '../types/entityType'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import Permission from './Permission'
import User from './User'
import { IsOptional, Length } from 'class-validator'

@Entity('role_tb')
export default class Role {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({
    name: 'role_name',
    type: 'varchar',
    length: 24,
    nullable: false,
    comment: '角色名称'
  })
  @Length(3, 24, { message: '角色名称不合法' })
  roleName!: string

  @Column({
    name: 'role_remark',
    type: 'varchar',
    length: 64,
    nullable: true,
    comment: '角色说明'
  })
  @IsOptional()
  @Length(5, 60, { message: '角色说明不合法' })
  roleRemark: string | undefined

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

  @ManyToMany(() => User, (user) => user.roleList)
  @JoinTable({
    name: 'user_role_tb',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_user_role_tb_role_id'
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'fk_user_role_tb_user_id'
    }
  })
  userList!: User[]

  @ManyToMany(() => Permission, (permission) => permission.roleList)
  permissionList!: Permission[]
}
