import { Column, Entity, JoinColumn, OneToOne } from 'typeorm'
import { FabricWidth } from '../types/entityType'
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
  fabricWidth!: FabricWidth

  @Column({
    name: 'reserved_value',
    type: 'double',
    default: 0.0,
    comment: '预留值'
  })
  reservedValue!: number

  @Column({
    name: 'shirt_length',
    type: 'double',
    default: 0.0,
    comment: '衫长'
  })
  shirtLength!: number

  @Column({
    name: 'bust',
    type: 'double',
    default: 0.0,
    comment: '胸围'
  })
  bust!: number

  @Column({
    name: 'shoulder_width',
    type: 'double',
    default: 0.0,
    comment: '肩宽'
  })
  shoulderWidth!: number

  @Column({
    name: 'sleeve_length',
    type: 'double',
    default: 0.0,
    comment: '袖长'
  })
  sleeveLength!: number

  @Column({
    name: 'cuff',
    type: 'double',
    default: 0.0,
    comment: '袖口'
  })
  cuff!: number

  @Column({
    name: 'neck_width',
    type: 'double',
    default: 0.0,
    comment: '领围'
  })
  neckWidth!: number

  @Column({
    name: 'chest_width',
    type: 'double',
    default: 0.0,
    comment: '胸宽'
  })
  chestWidth!: number

  @Column({
    name: 'back_width',
    type: 'double',
    default: 0.0,
    comment: '背宽'
  })
  backWidth!: number

  @Column({
    name: 'middle_waistline',
    type: 'double',
    default: 0.0,
    comment: '中腰围'
  })
  middleWaistline!: number

  @Column({
    name: 'anterior_waist_length',
    type: 'double',
    default: 0.0,
    comment: '前腰长'
  })
  anteriorWaistLength!: number

  @Column({
    name: 'back_waist_length',
    type: 'double',
    default: 0.0,
    comment: '后腰长'
  })
  backWaistLength!: number

  @Column({
    name: 'outseam',
    type: 'double',
    default: 0.0,
    comment: '裤长'
  })
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
  waistline!: number

  @Column({
    name: 'leg_width',
    type: 'double',
    default: 0.0,
    comment: '裤脚'
  })
  legWidth!: number

  @Column({
    name: 'skirt_length',
    type: 'double',
    default: 0.0,
    comment: '裙长'
  })
  skirtLength!: number
}
