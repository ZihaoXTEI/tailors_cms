import { Gender, Season, Status } from '../types/entityType'
import { Column, Entity, OneToMany, OneToOne } from 'typeorm'
import BaseEntity from './BaseEntity'
import Order from './Order'
import ClothTypeConsumption from './ClothTypeConsumption'
import { IsEnum, Length } from 'class-validator'

@Entity('clothtype_tb')
export default class ClothType extends BaseEntity {
  @Column({
    name: 'clothtype_name',
    type: 'varchar',
    length: 32,
    unique: true,
    comment: '服装类型名称'
  })
  @Length(2, 32, { message: '服装类型名称' })
  clothtypeName!: string

  @Column({
    name: 'clothtype_remark',
    type: 'varchar',
    length: 64,
    nullable: true,
    comment: '服装类型说明'
  })
  @Length(0, 64, { message: '布料说明不超过 64 个字符' })
  clothtypeRemark: string | undefined

  @Column({
    name: 'clothtype_season',
    type: 'enum',
    enum: Season,
    default: Season.SPRING,
    comment: '服装适合季节'
  })
  @IsEnum(Season)
  clothtypeSeason!: Season

  @Column({
    name: 'clothtype_gender',
    type: 'enum',
    enum: Gender,
    default: Gender.BOTH,
    comment: '服装适合性别'
  })
  @IsEnum(Gender)
  clothtypeGender!: Gender

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NORMAL,
    comment: '服装类型状态'
  })
  status!: Status

  // 需要测量人体部位
  @Column({
    name: 'shirt_length',
    type: 'boolean',
    default: false,
    comment: '衫长'
  })
  shirtLength!: boolean

  @Column({
    name: 'bust',
    type: 'boolean',
    default: false,
    comment: '胸围'
  })
  bust!: boolean

  @Column({
    name: 'shoulder_width',
    type: 'boolean',
    default: false,
    comment: '肩宽'
  })
  shoulderWidth!: boolean

  @Column({
    name: 'sleeve_length',
    type: 'boolean',
    default: false,
    comment: '袖长'
  })
  sleeveLength!: boolean

  @Column({
    name: 'cuff',
    type: 'boolean',
    default: false,
    comment: '袖口'
  })
  cuff!: boolean

  @Column({
    name: 'neck_width',
    type: 'boolean',
    default: false,
    comment: '领围'
  })
  neckWidth!: boolean

  @Column({
    name: 'chest_width',
    type: 'boolean',
    default: false,
    comment: '胸宽'
  })
  chestWidth!: boolean

  @Column({
    name: 'back_width',
    type: 'boolean',
    default: false,
    comment: '背宽'
  })
  backWidth!: boolean

  @Column({
    name: 'middle_waistline',
    type: 'boolean',
    default: false,
    comment: '中腰围'
  })
  middleWaistline!: boolean

  @Column({
    name: 'anterior_waist_length',
    type: 'boolean',
    default: false,
    comment: '前腰长'
  })
  anteriorWaistLength!: boolean

  @Column({
    name: 'back_waist_length',
    type: 'boolean',
    default: false,
    comment: '后腰长'
  })
  backWaistLength!: boolean

  @Column({
    name: 'outseam',
    type: 'boolean',
    default: false,
    comment: '裤长'
  })
  outseam!: boolean

  @Column({
    name: 'hipline',
    type: 'boolean',
    default: false,
    comment: '臀围'
  })
  hipline!: boolean

  @Column({
    name: 'waistline',
    type: 'boolean',
    default: false,
    comment: '腰围'
  })
  waistline!: boolean

  @Column({
    name: 'leg_width',
    type: 'boolean',
    default: false,
    comment: '裤脚'
  })
  legWidth!: boolean

  @Column({
    name: 'skirt_length',
    type: 'boolean',
    default: false,
    comment: '裙长'
  })
  skirtLength!: boolean

  @OneToMany(() => Order, (order) => order.clothType)
  orderList!: Order[]

  @OneToOne(() => ClothTypeConsumption, (clothTypeConsumption) => clothTypeConsumption.clothType)
  clothTypeConsumption!: ClothTypeConsumption
}
