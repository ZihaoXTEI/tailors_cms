import { Column, Entity } from 'typeorm'
import BaseEntity from './BaseEntity'

@Entity('order_process_tb')
export default class OrderProcess extends BaseEntity {
  @Column({
    name: 'tailor',
    type: 'varchar',
    length: 36,
    nullable: true,
    comment: '裁缝员工索引',
  })
  tailor!: string | undefined

  @Column({
    name: 'tailor_date',
    type: 'datetime',
    nullable: true,
    comment: '裁缝日期',
  })
  tailorDate!: Date | undefined

  @Column({
    name: 'sew',
    type: 'varchar',
    length: 36,
    nullable: true,
    comment: '缝制员工索引',
  })
  sew!: string | undefined

  @Column({
    name: 'sew_date',
    type: 'datetime',
    nullable: true,
    comment: '缝制日期',
  })
  sewDate!: Date | undefined

  @Column({
    name: 'iron',
    type: 'varchar',
    length: 36,
    nullable: true,
    comment: '整烫员工索引',
  })
  iron!: string | undefined

  @Column({
    name: 'iron_date',
    type: 'datetime',
    nullable: true,
    comment: '整烫日期',
  })
  ironDate!: Date | undefined

  @Column({
    name: 'finish',
    type: 'varchar',
    length: 36,
    nullable: true,
    comment: '成衣员工索引',
  })
  finish!: string | undefined

  @Column({
    name: 'finish_date',
    type: 'datetime',
    nullable: true,
    comment: '成衣日期',
  })
  finishDate!: Date | undefined

  // order_id
}
