import { Status } from '@/types/entityType'
import { Column, Entity } from 'typeorm'
import BaseEntity from './BaseEntity'

@Entity('fabric_tb')
export default class Fabric extends BaseEntity {
  @Column({
    name: 'fabric_name',
    type: 'varchar',
    length: 32,
    unique: true,
    comment: '布料名称',
  })
  fabricName!: string

  @Column({
    name: 'fabric_width',
    type: 'double',
    comment: '布料幅宽',
  })
  fabricWidth!: number

  @Column({
    name: 'fabric_price',
    type: 'double',
    default: 0.0,
    comment: '布料价格',
  })
  fabricPrice!: number

  @Column({
    name: 'fabric_url',
    type: 'varchar',
    length: 128,
    default: '',
    comment: '布料图片路径',
  })
  fabricUrl!: string

  @Column({
    name: 'fabric_feature',
    type: 'varchar',
    length: 80,
    default: '',
    comment: '布料特性',
  })
  fabricFeature!: string

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NORMAL,
    comment: '布料状态',
  })
  status!: Status

  // fabrictype_id
}
