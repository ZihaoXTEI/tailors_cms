import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { Gender, Status } from '../types/entityType'
import User from './User'
import Order from './Order'
import Favorite from './Favorite'
import AnthroMeasure from './AnthroMeasure'
import { IsEnum, IsOptional, IsPhoneNumber, Length } from 'class-validator'

@Entity('customer_tb')
export default class Customer {
  @PrimaryColumn({
    name: 'user_id',
    type: 'varchar',
    length: 36,
    nullable: false,
    comment: '顾客编号'
  })
  userId!: string

  @Column({
    name: 'customer_name',
    type: 'varchar',
    length: 16,
    nullable: false,
    comment: '顾客姓名'
  })
  @Length(2, 16, { message: '顾客姓名名称不合法' })
  customerName!: String

  @Column({
    name: 'customer_gender',
    type: 'enum',
    enum: Gender,
    nullable: false,
    comment: '顾客性别'
  })
  @IsEnum(Gender, { message: '顾客性别不合法' })
  customerGender!: Gender

  @Column({
    name: 'customer_phone',
    type: 'varchar',
    length: 11,
    nullable: true,
    comment: '顾客联系电话'
  })
  @IsOptional()
  @IsPhoneNumber('CH', { message: '顾客联系电话不合法' })
  customerPhone!: string

  @Column({
    name: 'customer_address',
    type: 'varchar',
    length: 64,
    nullable: true,
    comment: '顾客住址'
  })
  @IsOptional()
  @Length(3, 60, { message: '员工住址不合法' })
  customerAddress!: string

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NORMAL,
    comment: '顾客账号状态'
  })
  status!: Status

  @CreateDateColumn({
    name: 'create_at'
  })
  createAt!: Date

  @UpdateDateColumn({
    name: 'update_at'
  })
  updateAt!: Date

  @OneToOne(() => User, (user) => user.customer)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id'
  })
  user!: User

  @OneToMany(() => Order, (order) => order.customer)
  orderList!: Order[]

  @OneToMany(() => Favorite, (favorite) => favorite.customer)
  favoriteList!: Favorite[]

  @OneToMany(() => AnthroMeasure, (anthroMeasure) => anthroMeasure.customer)
  anthroMeasureList!: AnthroMeasure[]
}
