import { IsString, IsUUID, Max, Min } from 'class-validator'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import BaseEntity from './BaseEntity'
import Fabric from './Fabric'
import Order from './Order'

@Entity('order_fabric_tb')
export default class OrderFabric extends BaseEntity {
  @Column({
    name: 'ordfab_prede',
    type: 'double',
    comment: '预计用量'
  })
  @Min(1, { message: '预计用量不合法' })
  @Max(100000, { message: '预计用量不合法' })
  ordfabPrede!: number

  @Column({
    name: 'ordfab_usage',
    type: 'double',
    comment: '实际用量'
  })
  @Min(1, { message: '实际用量不合法' })
  @Max(100000, { message: '实际用量不合法' })
  ordfabUsage!: number

  @Column({
    name: 'order_id',
    type: 'varchar',
    length: 40
  })
  @IsString()
  orderId!: string

  @ManyToOne(() => Order, (order) => order.orderFabricList)
  @JoinColumn({
    name: 'order_id',
    referencedColumnName: 'id'
  })
  order!: Order

  @Column({
    name: 'fabric_id',
    type: 'varchar',
    length: 36
  })
  @IsUUID()
  fabricId!: string

  @ManyToOne(() => Fabric, (fabric) => fabric.orderFabricList)
  @JoinColumn({
    name: 'fabric_id',
    referencedColumnName: 'id'
  })
  fabric!: Fabric
}
