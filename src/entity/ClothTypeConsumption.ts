import { IsEnum, Max, Min } from 'class-validator'
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { FabricWidth, Status } from '../types/entityType'
import BaseEntity from './BaseEntity'
import ClothType from './ClothType'

@Entity('clothtype_consumption_tb')
export default class ClothTypeConsumption extends BaseEntity {
  @Column({
    name: 'clothtype_id',
    type: 'varchar',
    length: 36
  })
  clothTypeId!: string

  @OneToOne(() => ClothType, (clothType) => clothType.clothTypeConsumption)
  @JoinColumn({
    name: 'clothtype_id'
  })
  clothType!: ClothType

  @Column({
    name: 'remark',
    type: 'varchar',
    length: 128,
    nullable: true,
    comment: '备注'
  })
  remark!: string

  @Column({
    name: 'fabric_width',
    type: 'enum',
    enum: FabricWidth,
    comment: '布料幅宽'
  })
  @IsEnum(FabricWidth)
  fabricWidth!: FabricWidth

  @Column({
    name: 'reserved_value',
    type: 'double',
    default: 0.0,
    comment: '预留值'
  })
  @Min(0)
  @Max(1000)
  reservedValue!: number

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NORMAL,
    comment: '服装类型用料状态'
  })
  status!: Status

  @Column({
    name: 'shirt_length',
    type: 'double',
    default: 0.0,
    comment: '衫长'
  })
  @Min(0)
  @Max(1000)
  shirtLength!: number

  @Column({
    name: 'bust',
    type: 'double',
    default: 0.0,
    comment: '胸围'
  })
  @Min(0)
  @Max(1000)
  bust!: number

  @Column({
    name: 'shoulder_width',
    type: 'double',
    default: 0.0,
    comment: '肩宽'
  })
  @Min(0)
  @Max(1000)
  shoulderWidth!: number

  @Column({
    name: 'sleeve_length',
    type: 'double',
    default: 0.0,
    comment: '袖长'
  })
  @Min(0)
  @Max(1000)
  sleeveLength!: number

  @Column({
    name: 'cuff',
    type: 'double',
    default: 0.0,
    comment: '袖口'
  })
  @Min(0)
  @Max(1000)
  cuff!: number

  @Column({
    name: 'neck_width',
    type: 'double',
    default: 0.0,
    comment: '领围'
  })
  @Min(0)
  @Max(1000)
  neckWidth!: number

  @Column({
    name: 'chest_width',
    type: 'double',
    default: 0.0,
    comment: '胸宽'
  })
  @Min(0)
  @Max(1000)
  chestWidth!: number

  @Column({
    name: 'back_width',
    type: 'double',
    default: 0.0,
    comment: '背宽'
  })
  @Min(0)
  @Max(1000)
  backWidth!: number

  @Column({
    name: 'middle_waistline',
    type: 'double',
    default: 0.0,
    comment: '中腰围'
  })
  @Min(0)
  @Max(1000)
  middleWaistline!: number

  @Column({
    name: 'anterior_waist_length',
    type: 'double',
    default: 0.0,
    comment: '前腰长'
  })
  @Min(0)
  @Max(1000)
  anteriorWaistLength!: number

  @Column({
    name: 'back_waist_length',
    type: 'double',
    default: 0.0,
    comment: '后腰长'
  })
  @Min(0)
  @Max(1000)
  backWaistLength!: number

  @Column({
    name: 'outseam',
    type: 'double',
    default: 0.0,
    comment: '裤长'
  })
  @Min(0)
  @Max(1000)
  outseam!: number

  @Column({
    name: 'hipline',
    type: 'double',
    default: 0.0,
    comment: '臀围'
  })
  hipline!: number

  @Column({
    name: 'waistline',
    type: 'double',
    default: 0.0,
    comment: '腰围'
  })
  @Min(0)
  @Max(1000)
  waistline!: number

  @Column({
    name: 'leg_width',
    type: 'double',
    default: 0.0,
    comment: '裤脚'
  })
  @Min(0)
  @Max(1000)
  legWidth!: number

  @Column({
    name: 'skirt_length',
    type: 'double',
    default: 0.0,
    comment: '裙长'
  })
  @Min(0)
  @Max(1000)
  skirtLength!: number
}
