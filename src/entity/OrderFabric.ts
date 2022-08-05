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
  ordfabPrede!: number

  @Column({
    name: 'ordfab_usage',
    type: 'double',
    comment: '实际用量'
  })
  ordfabUsage!: number

  @ManyToOne(() => Order, (order) => order.orderFabricList)
  @JoinColumn({
    name: 'order_id',
    referencedColumnName: 'id'
  })
  order!: Order

  @ManyToOne(() => Fabric, (fabric) => fabric.orderFabricList)
  @JoinColumn({
    name: 'fabric_id',
    referencedColumnName: 'id'
  })
  fabric!: Fabric
}
