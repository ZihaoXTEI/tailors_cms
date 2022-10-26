import { ArrayUnique, IsArray, IsOptional, IsPositive } from 'class-validator'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import Permission from './Permission'
import Role from './Role'

@Entity('role_permission_tb')
export default class RolePermission {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({
    name: 'permission_id',
    type: 'int',
    unique: false
  })
  @IsPositive()
  permissionId!: number

  @ManyToMany(() => Permission, (permission) => permission.roleList)
  // @JoinColumn({
  //   name: 'permission_id',
  //   referencedColumnName: 'id',
  //   foreignKeyConstraintName: 'fk_permission_role_tb_permission_id'
  // })
  permissionList!: Permission[]

  @Column({
    name: 'role_id',
    type: 'int',
    unique: false
  })
  @IsPositive()
  roleId!: number

  @ManyToMany(() => Role, (role) => role.permissionList)
  // @JoinColumn({
  //   name: 'role_id',
  //   referencedColumnName: 'id',
  //   foreignKeyConstraintName: 'fk_permission_role_tb_roler_id'
  // })
  roleList!: Role[]

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

  @IsOptional()
  @IsArray()
  @ArrayUnique()
  permissionIdList!: number[]
}
