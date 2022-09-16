import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import BaseEntity from './BaseEntity'
import Fabric from './Fabric'
import Staff from './Staff'
import Supplier from './Supplier'

@Entity('fabric_inbound_tb')
export default class FabricInbound extends BaseEntity {
  @Column({
    name: 'inbound_length',
    type: 'double',
    comment: '入库长度'
  })
  inboundLength!: number

  @Column({
    name: 'inbound_price',
    type: 'double',
    default: 0.0,
    comment: '入库时价格'
  })
  inboundPrice!: number

  @Column({
    name: 'inbound_date',
    type: 'date',
    comment: '入库日期'
  })
  inboundDate!: Date

  @Column({
    name: 'fabric_id',
    type: 'varchar',
    length: 36
  })
  fabricId!: string

  @ManyToOne(() => Fabric, (fabric) => fabric.fabricInboundList)
  @JoinColumn({
    name: 'fabric_id',
    referencedColumnName: 'id'
  })
  fabric!: Fabric

  @Column({
    name: 'supplier_id',
    type: 'varchar',
    length: 36
  })
  supplierId!: string

  @ManyToOne(() => Supplier, (supplier) => supplier.fabricInboundList)
  @JoinColumn({
    name: 'supplier_id',
    referencedColumnName: 'id'
  })
  supplier!: Supplier

  @ManyToOne(() => Staff, (staff) => staff.fabricInboundList)
  @JoinColumn({
    name: 'inbound_receiver'
  })
  staff!: Staff
}
