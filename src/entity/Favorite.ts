import { Entity, JoinColumn, ManyToOne } from 'typeorm'
import BaseEntity from './BaseEntity'
import Customer from './Customer'
import Fabric from './Fabric'

@Entity('favorite_tb')
export default class Favorite extends BaseEntity {
  @ManyToOne(() => Fabric, (fabric) => fabric.favoriteList)
  @JoinColumn({
    name: 'fabric_id'
  })
  fabric!: Fabric

  @ManyToOne(() => Customer, (customer) => customer.favoriteList)
  @JoinColumn({
    name: 'customer_id'
  })
  customer!: Customer
}
