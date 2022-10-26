import { IsDate, IsString, IsUUID, Max, Min } from 'class-validator'
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
  @Min(0, { message: '入库长度不合法' })
  @Max(100000, { message: '入库长度不合法' })
  inboundLength!: number

  @Column({
    name: 'inbound_price',
    type: 'double',
    default: 0.0,
    comment: '入库时价格'
  })
  @Min(0, { message: '入库时价格不合法' })
  @Max(10000, { message: '入库时价格不合法' })
  inboundPrice!: number

  @Column({
    name: 'inbound_date',
    type: 'date',
    comment: '入库日期'
  })
  @IsDate()
  inboundDate!: Date

  @Column({
    name: 'fabric_id',
    type: 'varchar',
    length: 36
  })
  @IsUUID()
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
  @IsUUID()
  supplierId!: string

  @ManyToOne(() => Supplier, (supplier) => supplier.fabricInboundList)
  @JoinColumn({
    name: 'supplier_id',
    referencedColumnName: 'id'
  })
  supplier!: Supplier

  @Column({
    name: 'inbound_receiver',
    type: 'varchar',
    length: 36
  })
  inboundReceiver!: string

  @ManyToOne(() => Staff, (staff) => staff.fabricInboundList)
  @JoinColumn({
    name: 'inbound_receiver'
  })
  staff!: Staff
}
