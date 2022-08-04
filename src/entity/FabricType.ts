import { Status } from '@/types/entityType'
import { Column, Entity } from 'typeorm'

@Entity('fabrictype_tb')
export default class FabricType {
  @Column({
    name: 'fabrictype_name',
    type: 'varchar',
    length: 24,
    unique: true,
    comment: '布料名称',
  })
  fabrictypeName!: string

  @Column({
    name: 'fabrictypeRemark',
    type: 'varchar',
    length: 64,
    comment: '布料说明',
  })
  fabrictype_remark: string | undefined

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.NORMAL,
    comment: '布料类型状态',
  })
  status!: Status
}
