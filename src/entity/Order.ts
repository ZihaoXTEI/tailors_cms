import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn
} from 'typeorm'
import { PaymentMethod, OrderStatus } from '../types/entityType'
import Customer from './Customer'
import ClothType from './ClothType'
import OrderFabric from './OrderFabric'
import OrderProcess from './OrderProcess'
import AnthroMeasure from './AnthroMeasure'

@Entity('order_tb')
export default class Order {
  @PrimaryColumn({
    type: 'varchar',
    length: '32'
  })
  id!: string

  @Column({
    name: 'order_name',
    type: 'varchar',
    length: 128,
    comment: '订单自定义名称'
  })
  orderName!: string

  @Column({
    name: 'order_number',
    type: 'tinyint',
    default: 1,
    comment: '订做数量'
  })
  orderNumber!: number

  @Column({
    name: 'total_amount',
    type: 'double',
    comment: '订单总价格'
  })
  totalAmount!: number

  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CASHPAYMENT,
    comment: '支付方式'
  })
  paymentMethod!: PaymentMethod

  @Column({
    name: 'booked_amount',
    type: 'double',
    default: 0.0,
    comment: '预订金额'
  })
  bookedAmount!: number

  @Column({
    name: 'order_status',
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.CREATED,
    comment: '订单状态'
  })
  orderStatus!: OrderStatus

  @Column({
    name: 'deadline',
    type: 'date',
    comment: '交付日期'
  })
  deadline!: Date

  @CreateDateColumn({
    name: 'create_at'
  })
  createAt!: Date

  @UpdateDateColumn({
    name: 'update_at'
  })
  updateAt!: Date

  @ManyToOne(() => Customer, (customer) => customer.orderList)
  @JoinColumn({
    name: 'customer_id'
    // referencedColumnName: 'userId'
  })
  customer!: Customer

  @ManyToOne(() => ClothType, (clothtype) => clothtype.orderList)
  @JoinColumn({
    name: 'clothtype_id',
    referencedColumnName: 'id'
  })
  clothtype!: ClothType

  @OneToMany(() => OrderFabric, (orderFabirc) => orderFabirc.order)
  orderFabricList!: OrderFabric[]

  @OneToOne(() => OrderProcess, (orderProcess) => orderProcess.order)
  orderProcess!: OrderProcess

  @ManyToOne(() => AnthroMeasure, (anthroMeasure) => anthroMeasure.orderList)
  @JoinColumn({
    name: 'anthroMeasure_id',
    referencedColumnName: 'id'
  })
  anthroMeasure!: AnthroMeasure
}
