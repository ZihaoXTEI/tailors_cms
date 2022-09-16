import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import Role from './Role'
import User from './User'

@Entity('user_role_tb')
export default class UserRole {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({
    name: 'role_id',
    type: 'int',
    unique: false
  })
  roleId!: number

  @ManyToMany(() => User, (user) => user.roleList)
  userList!: User[]

  @Column({
    name: 'user_id',
    type: 'varchar',
    length: 36,
    unique: false
  })
  userId!: string

  @ManyToMany(() => Role, (role) => role.userList)
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
}
