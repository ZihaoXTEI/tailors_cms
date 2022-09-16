import { FabricWidth, Gender, Season, Status } from '../types/entityType'
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import BaseEntity from './BaseEntity'
import FabricInbound from './FabricInbound'
import FabricType from './FabricType'
import Favorite from './Favorite'
import OrderFabric from './OrderFabric'

@Entity('fabric_tb')
export default class Fabric extends BaseEntity {
  @Column({
    name: 'fabric_name',
    type: 'varchar',
    length: 32,
    unique: true,
    comment: '布料名称'
  })
  fabricName!: string

  @Column({
    name: 'fabric_width',
    type: 'enum',
    enum: FabricWidth,
    comment: '布料幅宽'
  })
  fabricWidth!: FabricWidth

  @Column({
    name: 'fabric_price',
    type: 'double',
    default: 0.0,
    comment: '布料价格'
  })
  fabricPrice!: number

  @Column({
    name: 'fabric_url',
    type: 'varchar',
    length: 128,
    default: '',
    comment: '布料图片路径'
  })
  fabricUrl!: string

  @Column({
    name: 'fabric_feature',
    type: 'varchar',
    length: 80,
    default: '',
    comment: '布料特性'
  })
  fabricFeature!: string

  @Column({
    name: 'fabric_season',
    type: 'enum',
    enum: Season,
    default: Season.SPRING,
    comment: '布料适合季节'
  })
  fabricSeason!: Season

  @Column({
    name: 'fabric_gender',
    type: 'enum',
    enum: Gender,
    default: Gender.BOTH,
    comment: '布料适合性别'
  })
  fabricGender!: Gender

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NORMAL,
    comment: '布料状态'
  })
  status!: Status

  @Column({
    name: 'fabrictype_id',
    type: 'varchar',
    length: 36
  })
  fabricTypeId!: string

  @ManyToOne(() => FabricType, (fabricType) => fabricType.fabricList)
  @JoinColumn({
    name: 'fabrictype_id'
  })
  fabricType!: FabricType

  @OneToMany(() => FabricInbound, (fabricInbound) => fabricInbound.fabric)
  fabricInboundList!: FabricInbound[]

  @OneToMany(() => OrderFabric, (orderFabirc) => orderFabirc.fabric)
  orderFabricList!: OrderFabric[]

  @OneToMany(() => Favorite, (favorite) => favorite.fabric)
  favoriteList!: Favorite[]
}
