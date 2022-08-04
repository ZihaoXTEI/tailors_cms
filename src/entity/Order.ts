import { Column, Entity } from 'typeorm'
import { PaymentMethod, OrderStatus } from '@/types/entityType'
import BaseEntity from './BaseEntity'

@Entity('order_tb')
export default class Order extends BaseEntity {
  @Column({
    name: 'order_name',
    type: 'varchar',
    length: 128,
    comment: '订单自定义名称',
  })
  orderName!: string

  @Column({
    name: 'order_number',
    type: 'tinyint',
    default: 1,
    comment: '订做数量',
  })
  orderNumber!: number

  @Column({
    name: 'total_amount',
    type: 'double',
    comment: '订单总价格',
  })
  totalAmount!: number

  @Column({
    name: 'payment_method',
    type: 'enum',
    enum: PaymentMethod,
    default: PaymentMethod.CASHPAYMENT,
    comment: '支付方式',
  })
  paymentMethod!: PaymentMethod

  @Column({
    name: 'booked_amount',
    type: 'double',
    default: 0.0,
    comment: '预订金额',
  })
  bookedAmount!: number

  @Column({
    name: 'order_status',
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.CREATED,
    comment: '订单状态',
  })
  orderStatus!: OrderStatus

  @Column({
    name: 'deadline',
    type: 'date',
    comment: '交付日期',
  })
  deadline!: Date

  // customer_id
  // anthr_id
  // clothtype_id
}
