import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm'
import BaseEntity from './BaseEntity'
import Customer from './Customer'
import Order from './Order'

// Anthropometric Measurements
@Entity('anthromeasure_tb')
export default class AnthroMeasure extends BaseEntity {
  @Column({
    name: 'customer_id',
    type: 'varchar',
    length: 36
  })
  customerId!: string

  @ManyToOne(() => Customer, (customer) => customer.anthroMeasureList)
  @JoinColumn({
    name: 'customer_id'
  })
  customer!: Customer

  @Column({
    name: 'measurements',
    type: 'json',
    comment: '人体测量数据'
  })
  measurements!: JSON

  @OneToMany(() => Order, (order) => order.anthroMeasure)
  orderList!: Order[]
}
