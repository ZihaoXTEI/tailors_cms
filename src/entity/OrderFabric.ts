import { Column, Entity } from 'typeorm'
import BaseEntity from './BaseEntity'

@Entity('order_fabric_tb')
export default class OrderFabric extends BaseEntity {
  @Column({
    name: 'ordfab_prede',
    type: 'double',
    comment: '预计用量',
  })
  ordfabPrede!: number

  @Column({
    name: 'ordfab_usage',
    type: 'double',
    comment: '实际用量',
  })
  ordfabUsage!: number

  // order_id
  // fabric_id
}
