import { Column, Entity } from 'typeorm'
import BaseEntity from './BaseEntity'

@Entity('fabric_inbound_tb')
export default class FabricInbound extends BaseEntity {
  @Column({
    name: 'inbound_length',
    type: 'double',
    comment: '入库长度',
  })
  inboundLength!: number

  @Column({
    name: 'inbound_price',
    type: 'double',
    default: 0.0,
    comment: '入库时价格',
  })
  inboundPrice!: number

  @Column({
    name: 'inbound_date',
    type: 'date',
    comment: '入库日期',
  })
  inboundDate!: Date

  // inbound_receiver 入库人
  // fabric_id
  // supplier_id
}
