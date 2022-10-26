import { IsUUID } from 'class-validator'
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import BaseEntity from './BaseEntity'
import Customer from './Customer'
import Fabric from './Fabric'

@Entity('favorite_tb')
export default class Favorite extends BaseEntity {
  @Column({
    name: 'fabric_id',
    type: 'varchar',
    length: 36
  })
  @IsUUID()
  fabricId!: string

  @ManyToOne(() => Fabric, (fabric) => fabric.favoriteList)
  @JoinColumn({
    name: 'fabric_id'
  })
  fabric!: Fabric

  @Column({
    name: 'customer_id',
    type: 'varchar',
    length: 36
  })
  @IsUUID()
  customerId!: string

  @ManyToOne(() => Customer, (customer) => customer.favoriteList)
  @JoinColumn({
    name: 'customer_id'
  })
  customer!: Customer
}
