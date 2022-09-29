import { Gender, Status } from '../types/entityType'
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
import FabricInbound from './FabricInbound'
import User from './User'
import { IsDate, IsEnum, IsOptional, IsPhoneNumber, Length, Max, Min } from 'class-validator'

@Entity('staff_tb')
export default class Staff {
  @PrimaryColumn({
    name: 'user_id',
    type: 'varchar',
    length: 36,
    nullable: false,
    comment: '职员编号'
  })
  userId!: string

  @Column({
    name: 'staff_name',
    type: 'varchar',
    length: 16,
    comment: '职员姓名'
  })
  @Length(2, 16, { message: '职员姓名名称不合法' })
  staffName!: string

  @Column({
    name: 'staff_gender',
    type: 'enum',
    enum: Gender,
    default: Gender.MALE,
    comment: '职员性别'
  })
  @IsEnum(Gender, { message: '职员性别不合法' })
  staffGender!: Gender

  @Column({
    name: 'staff_salary',
    type: 'double',
    comment: '职员每月工资'
  })
  @Min(0, { message: '职员每月工资不合法' })
  @Max(100000, { message: '职员每月工资不合法' })
  staffSalary!: number

  @Column({
    name: 'staff_entrydate',
    type: 'date',
    comment: '职员入职时间'
  })
  @IsDate({ message: '职员入职时间不合法' })
  staffEntrydate!: Date

  @Column({
    name: 'staff_phone',
    type: 'varchar',
    length: 14,
    comment: '职员联系电话'
  })
  @IsOptional()
  @IsPhoneNumber('CH', { message: '职员联系电话不合法' })
  staffPhone!: string

  @Column({
    name: 'staff_address',
    type: 'varchar',
    length: 64,
    comment: '职员住址'
  })
  @IsOptional()
  @Length(3, 60, { message: '职员住址不合法' })
  staffAddress!: string

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NORMAL,
    comment: '职员账号状态'
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

  @OneToOne(() => User, (user) => user.staff)
  @JoinColumn({
    name: 'user_id'
  })
  user!: User

  @OneToMany(() => FabricInbound, (fabricInbound) => fabricInbound.staff)
  fabricInboundList!: FabricInbound[]
}
